export interface Chat {
  id: string;
  created_at: number | null;
  type: "direct" | "group";
  name: string;
  description: string;
  participants_id: {
    profile_picture: {
      url: string;
    } | null;
  }[];
  group_image: {
    access: string;
    path: string;
    name: string;
    type: string;
    size: number;
    mime: string;
    meta: {
      width: number;
      height: number;
    };
    url: string;
  } | null;
}

export interface Message {
  id: number;
  created_at: number;
  channel_id: string;
  sender_id: number;
  text: string;
  receivers: {
    user_id: number;
    read: boolean;
  }[];
  _sender_info?: {
    username: string;
    profile_picture: {
      url: string;
    } | null;
  };
  date?: string;
}

export interface Contact {
  id: number;
  username: string;
  profile_picture: {
    url: string;
  } | null;
}

export interface ChatRefreshResponse {
  updates: {
    channel_id: string;
    last_message: {
      created_at: number;
      sender_id: number;
      text: string;
    };
    _channel_info: Chat;
  }[];
  current_channel?: {
    channel_info: {
      _channel_info: Chat;
    };
    messages: {
      date: string;
      messages: Message[];
    }[];
  };
  contact_list: Contact[];
}