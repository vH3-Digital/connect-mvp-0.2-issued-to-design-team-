import { WS_CONFIG, getWebSocketUrl, calculateReconnectDelay } from '../config/websocket';

export class WebSocketService {
  private ws: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private connectionTimeout: NodeJS.Timeout | null = null;
  private connectionAttempts = 0;

  constructor(
    private userId: number,
    private token: string,
    private onMessage: (data: any) => void,
    private onConnectionChange: (connected: boolean) => void,
    private onError: (error: string) => void
  ) {}

  connect(): void {
    if (this.connectionAttempts >= WS_CONFIG.MAX_RECONNECT_ATTEMPTS) {
      this.onError('Maximum reconnection attempts reached');
      return;
    }

    try {
      // Close existing connection if any
      this.cleanup();

      // Create new connection
      this.ws = new WebSocket(getWebSocketUrl(this.userId));

      // Set connection timeout
      this.connectionTimeout = setTimeout(() => {
        if (this.ws?.readyState !== WebSocket.OPEN) {
          this.ws?.close(WS_CONFIG.CLOSE_CODES.INTERNAL_ERROR, 'Connection timeout');
        }
      }, WS_CONFIG.CONNECTION_TIMEOUT);

      // Connection handlers
      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleOpen(): void {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
    }

    console.log('WebSocket connected successfully');
    this.connectionAttempts = 0;
    this.onConnectionChange(true);

    // Send authentication
    this.send({
      type: WS_CONFIG.MESSAGE_TYPES.AUTH,
      token: this.token
    });

    // Setup heartbeat
    this.pingInterval = setInterval(() => {
      this.send({ type: WS_CONFIG.MESSAGE_TYPES.PING });
    }, WS_CONFIG.PING_INTERVAL);
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      this.onMessage(data);
    } catch (err) {
      console.error('Error processing message:', err);
    }
  }

  private handleError(error: any): void {
    console.error('WebSocket error:', error);
    this.onConnectionChange(false);
    this.onError('Connection error occurred');
  }

  private handleClose(event: CloseEvent): void {
    console.log('WebSocket closed:', event.code, event.reason);
    this.onConnectionChange(false);
    this.cleanup();

    // Don't reconnect if closed normally
    if (event.code !== WS_CONFIG.CLOSE_CODES.NORMAL) {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.connectionAttempts < WS_CONFIG.MAX_RECONNECT_ATTEMPTS) {
      const nextAttempt = this.connectionAttempts + 1;
      this.connectionAttempts = nextAttempt;

      const delay = calculateReconnectDelay(nextAttempt);
      this.reconnectTimeout = setTimeout(() => {
        console.log(`Reconnecting (${nextAttempt}/${WS_CONFIG.MAX_RECONNECT_ATTEMPTS})`);
        this.connect();
      }, delay);
    }
  }

  send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      this.onError('Connection not available');
    }
  }

  private cleanup(): void {
    if (this.ws) {
      this.ws.close(WS_CONFIG.CLOSE_CODES.NORMAL, 'Cleanup');
      this.ws = null;
    }
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
  }

  disconnect(): void {
    this.cleanup();
    this.connectionAttempts = WS_CONFIG.MAX_RECONNECT_ATTEMPTS; // Prevent reconnection
  }
}