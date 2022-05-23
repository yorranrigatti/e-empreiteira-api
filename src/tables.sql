CREATE TABLE IF NOT EXISTS products_cart(
    id BIGSERIAL INTEGER NOT NULL,
    cart_id VARCHAR(100) NOT NULL,
    products_id VARCHAR(100) NOT NULL,
    FOREING KEY (cart_id) REFERENCES cart (id) ON DELETE CASCADE,
    FOREING KEY (products_id) REFERENCES products (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS stock_products(
    id BIGSERIAL INTEGER NOT NULL,
    sale_price DECIMAL(5,2) NOT NULL,
    cost_price DECIMAL(5,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    mark VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);