-- Categories for organizing articles
CREATE TABLE kb_categories (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Main articles/documents table
CREATE TABLE kb_articles (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    category_id UUID REFERENCES kb_categories(id),
    file_url VARCHAR(500),
    file_type VARCHAR(50), -- pdf, image, spreadsheet
    file_size BIGINT,
    read_time INTEGER, -- in minutes
    view_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tags for flexible categorization
CREATE TABLE kb_tags (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- Article-Tag relationship
CREATE TABLE kb_article_tags (
    article_id UUID REFERENCES kb_articles(id),
    tag_id UUID REFERENCES kb_tags(id),
    PRIMARY KEY (article_id, tag_id)
);

-- Track article views
CREATE TABLE kb_article_views (
    id UUID PRIMARY KEY,
    article_id UUID REFERENCES kb_articles(id),
    user_id UUID REFERENCES users(id),
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);

-- Bookmarks/Saved articles
CREATE TABLE kb_bookmarks (
    user_id UUID REFERENCES users(id),
    article_id UUID REFERENCES kb_articles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, article_id)
);

-- Article revisions for version control
CREATE TABLE kb_revisions (
    id UUID PRIMARY KEY,
    article_id UUID REFERENCES kb_articles(id),
    content TEXT NOT NULL,
    changes_description TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Access permissions
CREATE TABLE kb_permissions (
    id UUID PRIMARY KEY,
    article_id UUID REFERENCES kb_articles(id),
    role_id UUID REFERENCES roles(id), -- Assuming you have a roles table
    can_view BOOLEAN DEFAULT false,
    can_edit BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
