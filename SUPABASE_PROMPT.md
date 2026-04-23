# SUPABASE_PROMPT.md
# Alfresco Restaurante – Configuración Completa de Backend en Supabase
# Copia y pega todo el contenido SQL en el SQL Editor de Supabase

---

## INSTRUCCIONES DE USO

1. Crea un nuevo proyecto en https://supabase.com
2. Ve a **SQL Editor** en el panel lateral
3. Crea una **New Query**
4. Copia y pega el bloque SQL completo de abajo
5. Haz clic en **Run**
6. Copia la URL y la anon key de **Settings → API**
7. Pégalas en tu archivo `.env`

---

```sql
-- =============================================
-- ALFRESCO RESTAURANTE – SUPABASE SCHEMA COMPLETO
-- Ejecutar en: Supabase SQL Editor
-- =============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- 1. TABLA: PERFILES DE USUARIO
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email       TEXT,
  full_name   TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  role        TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 2. TABLA: RESERVACIONES
-- =============================================
CREATE TABLE IF NOT EXISTS public.reservations (
  id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id             UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  first_name          TEXT NOT NULL,
  last_name           TEXT NOT NULL,
  phone               TEXT NOT NULL,
  email               TEXT NOT NULL,
  reservation_date    DATE NOT NULL,
  reservation_time    TIME NOT NULL,
  guests              INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 50),
  area                TEXT DEFAULT 'interior' CHECK (area IN ('interior', 'terraza', 'privado', '')),
  occasion            TEXT DEFAULT '',
  notes               TEXT DEFAULT '',
  confirmation_code   TEXT UNIQUE NOT NULL,
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  internal_notes      TEXT DEFAULT '',
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. TABLA: MENSAJES DE CONTACTO
-- =============================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT DEFAULT '',
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  status      TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  replied_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. TABLA: CATEGORÍAS DEL MENÚ
-- =============================================
CREATE TABLE IF NOT EXISTS public.menu_categories (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  icon        TEXT DEFAULT '🍽',
  description TEXT DEFAULT '',
  sort_order  INTEGER DEFAULT 0,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. TABLA: PLATOS DEL MENÚ
-- =============================================
CREATE TABLE IF NOT EXISTS public.menu_items (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id     UUID REFERENCES public.menu_categories(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  name_en         TEXT NOT NULL,
  description     TEXT DEFAULT '',
  description_en  TEXT DEFAULT '',
  price           DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  image_url       TEXT DEFAULT '',
  is_signature    BOOLEAN DEFAULT false,
  is_spicy        BOOLEAN DEFAULT false,
  is_vegetarian   BOOLEAN DEFAULT false,
  is_available    BOOLEAN DEFAULT true,
  badge           TEXT DEFAULT '',
  allergens       TEXT[] DEFAULT '{}',
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 6. TABLA: PRODUCTOS DE LA TIENDA
-- =============================================
CREATE TABLE IF NOT EXISTS public.products (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name            TEXT NOT NULL,
  name_en         TEXT DEFAULT '',
  description     TEXT DEFAULT '',
  description_en  TEXT DEFAULT '',
  price           DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock           INTEGER DEFAULT 0,
  category        TEXT DEFAULT '' CHECK (category IN ('conservas', 'salsas', 'packs', 'experiencias', '')),
  image_url       TEXT DEFAULT '',
  badge           TEXT DEFAULT '',
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 7. TABLA: PEDIDOS DE LA TIENDA
-- =============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  customer_email  TEXT DEFAULT '',
  items           JSONB NOT NULL DEFAULT '[]',
  total           DECIMAL(10,2) NOT NULL,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'delivered', 'cancelled')),
  delivery_type   TEXT DEFAULT 'pickup' CHECK (delivery_type IN ('pickup', 'delivery')),
  delivery_address TEXT DEFAULT '',
  notes           TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 8. TABLA: POSTS DEL BLOG
-- =============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title           TEXT NOT NULL,
  title_en        TEXT DEFAULT '',
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT DEFAULT '',
  excerpt_en      TEXT DEFAULT '',
  content         TEXT DEFAULT '',
  content_en      TEXT DEFAULT '',
  cover_image_url TEXT DEFAULT '',
  category        TEXT DEFAULT '',
  tags            TEXT[] DEFAULT '{}',
  read_time       TEXT DEFAULT '5 min',
  published       BOOLEAN DEFAULT false,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 9. TABLA: SUSCRIPTORES DEL NEWSLETTER
-- =============================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  name        TEXT DEFAULT '',
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 10. TABLA: RESEÑAS
-- =============================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT DEFAULT '',
  source      TEXT DEFAULT 'website' CHECK (source IN ('website', 'google', 'tripadvisor', 'facebook')),
  approved    BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY – ACTIVAR EN TODAS LAS TABLAS
-- =============================================
ALTER TABLE public.profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews              ENABLE ROW LEVEL SECURITY;

-- =============================================
-- POLÍTICAS RLS
-- =============================================

-- PROFILES: usuarios ven y editan solo su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RESERVATIONS: cualquiera puede crear; solo admin o propietario puede ver
CREATE POLICY "Anyone can create reservations"
  ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own reservations"
  ON public.reservations FOR SELECT USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
CREATE POLICY "Admin can update reservations"
  ON public.reservations FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','staff'))
  );

-- CONTACT MESSAGES: cualquiera puede crear; solo admin puede ver
CREATE POLICY "Anyone can send contact messages"
  ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view contact messages"
  ON public.contact_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- MENU CATEGORIES & ITEMS: lectura pública
CREATE POLICY "Public can read menu categories"
  ON public.menu_categories FOR SELECT USING (active = true);
CREATE POLICY "Admin can manage menu categories"
  ON public.menu_categories FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Public can read menu items"
  ON public.menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Admin can manage menu items"
  ON public.menu_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- PRODUCTS: lectura pública de activos
CREATE POLICY "Public can read active products"
  ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admin can manage products"
  ON public.products FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ORDERS: cualquiera puede crear; usuario ve los suyos
CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- BLOG POSTS: lectura pública de publicados
CREATE POLICY "Public can read published posts"
  ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admin can manage blog posts"
  ON public.blog_posts FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- NEWSLETTER: cualquiera puede suscribirse
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- REVIEWS: cualquiera puede crear; solo aprobadas son públicas
CREATE POLICY "Anyone can create reviews"
  ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read approved reviews"
  ON public.reviews FOR SELECT USING (approved = true);
CREATE POLICY "Admin can manage reviews"
  ON public.reviews FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- BUCKETS DE STORAGE
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('menu-images',    'menu-images',    true),
  ('product-images', 'product-images', true),
  ('blog-images',    'blog-images',    true),
  ('gallery',        'gallery',        true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage: lectura pública, escritura solo admin
CREATE POLICY "Public read menu images"
  ON storage.objects FOR SELECT USING (bucket_id = 'menu-images');
CREATE POLICY "Admin upload menu images"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'menu-images'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public read blog images"
  ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Public read gallery"
  ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

-- =============================================
-- DATOS INICIALES – CATEGORÍAS DEL MENÚ
-- =============================================
INSERT INTO public.menu_categories (name, name_en, slug, icon, description, sort_order) VALUES
  ('Ceviches',       'Ceviches',         'ceviches',   '🍋', 'La esencia del Perú. Elaborados con pescados y mariscos del día.', 1),
  ('Tiraditos',      'Tiraditos',         'tiraditos',  '🐟', 'La fusión japonesa-peruana en su máxima expresión.', 2),
  ('Entradas',       'Starters',          'entradas',   '🦐', 'El preludio perfecto a una gran velada marina.', 3),
  ('Fondos',         'Main Courses',      'fondos',     '🦞', 'Platos principales del mar diseñados para deleitar.', 4),
  ('Parrilla Marina','Seafood Grill',     'parrilla',   '🔥', 'Lo mejor del mar encontrando el fuego.', 5),
  ('Postres',        'Desserts',          'postres',    '🍮', 'El dulce final de una experiencia perfecta.', 6),
  ('Bebidas',        'Beverages',         'bebidas',    '🍹', 'Cócteles, piscos y maridajes perfectos.', 7)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- DATOS INICIALES – PLATOS DEL MENÚ
-- =============================================
INSERT INTO public.menu_items (category_id, name, name_en, description, description_en, price, is_signature, is_spicy)
SELECT
  (SELECT id FROM public.menu_categories WHERE slug = 'ceviches'),
  'Ceviche Clásico Alfresco',
  'Classic Alfresco Ceviche',
  'Corvina fresca marinada en leche de tigre, ají limo, cebolla morada, choclo y cancha serrana.',
  'Fresh sea bass marinated in tiger''s milk, ají limo, red onion, corn and toasted corn.',
  52.00, true, false
WHERE EXISTS (SELECT 1 FROM public.menu_categories WHERE slug = 'ceviches');

INSERT INTO public.menu_items (category_id, name, name_en, description, description_en, price, is_signature, is_spicy)
SELECT
  (SELECT id FROM public.menu_categories WHERE slug = 'ceviches'),
  'Ceviche Mixto Premium',
  'Premium Mixed Ceviche',
  'Corvina, pulpo, langostinos y conchas negras en leche de tigre con rocoto.',
  'Sea bass, octopus, prawns and black clams in tiger milk with rocoto pepper.',
  68.00, false, true
WHERE EXISTS (SELECT 1 FROM public.menu_categories WHERE slug = 'ceviches');

INSERT INTO public.menu_items (category_id, name, name_en, description, description_en, price, is_signature)
SELECT
  (SELECT id FROM public.menu_categories WHERE slug = 'parrilla'),
  'Pulpo a la Parrilla',
  'Grilled Octopus',
  'Pulpo mediterráneo grillado con aceite de oliva, paprika ahumada y puré de papa amarilla.',
  'Grilled Mediterranean octopus with olive oil, smoked paprika and yellow potato purée.',
  78.00, true
WHERE EXISTS (SELECT 1 FROM public.menu_categories WHERE slug = 'parrilla');

INSERT INTO public.menu_items (category_id, name, name_en, description, description_en, price, is_signature)
SELECT
  (SELECT id FROM public.menu_categories WHERE slug = 'tiraditos'),
  'Tiradito Nikkei',
  'Nikkei Tiradito',
  'Láminas de lenguado, leche de tigre de ají amarillo, aceite de sésamo y jengibre.',
  'Sole fillets, yellow chili tiger''s milk, sesame oil and ginger.',
  58.00, true
WHERE EXISTS (SELECT 1 FROM public.menu_categories WHERE slug = 'tiraditos');

-- =============================================
-- DATOS INICIALES – PRODUCTOS DE LA TIENDA
-- =============================================
INSERT INTO public.products (name, description, price, category, badge, stock) VALUES
  ('Conserva de Pulpo en Aceite de Oliva', 'Pulpo mediterráneo en aceite de oliva virgen extra con hierbas finas. 180g.', 38.00, 'conservas', 'Best Seller', 50),
  ('Leche de Tigre Alfresco', 'Nuestra icónica base de ceviche, lista para usar. Botella 500ml.', 32.00, 'salsas', 'Signature', 80),
  ('Pack Gourmet Marino', 'Conserva de pulpo + Leche de Tigre + Salsa de Ají Amarillo + packaging premium.', 95.00, 'packs', 'Nuevo', 20),
  ('Salsa de Ají Amarillo Artesanal', 'Ají amarillo fresco del norte peruano con toques de limón y culantro. 250ml.', 24.00, 'salsas', '', 100),
  ('Conserva de Anchoveta Premium', 'Anchoveta peruana del litoral, prensada en aceite de oliva. Lata 120g.', 22.00, 'conservas', '', 60),
  ('Experiencia Ceviche en Casa', 'Kit completo para preparar ceviche Alfresco: insumos frescos + receta + video del chef.', 120.00, 'experiencias', 'Exclusivo', 15)
ON CONFLICT DO NOTHING;

-- =============================================
-- DATOS INICIALES – BLOG POSTS
-- =============================================
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, read_time, published, published_at) VALUES
  (
    'La Historia del Ceviche: El Plato que Conquistó el Mundo',
    'historia-ceviche-peruano',
    'Un viaje por los orígenes del plato más emblemático del Perú, desde las costas prehispánicas hasta las mesas más exclusivas del mundo.',
    '<p>El ceviche es, sin duda, el plato más emblemático de la gastronomía peruana...</p>',
    'Cultura Gastronómica',
    '8 min',
    true,
    NOW() - INTERVAL '7 days'
  ),
  (
    'Temporada de Mariscos en Lima: Qué Pedir en Cada Mes',
    'temporada-mariscos-lima',
    'Los mejores mariscos no son los mismos todo el año. Te enseñamos a comer como un experto según la temporada del litoral peruano.',
    '<p>Cada temporada del año trae consigo diferentes tesoros del mar peruano...</p>',
    'Guía Gastronómica',
    '5 min',
    true,
    NOW() - INTERVAL '14 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- DATOS INICIALES – RESEÑAS APROBADAS
-- =============================================
INSERT INTO public.reviews (author_name, rating, comment, source, approved) VALUES
  ('María González', 5, 'El mejor restaurante de mariscos en Lima. El ceviche es absolutamente delicioso y el servicio impecable.', 'tripadvisor', true),
  ('James & Sarah T.', 5, 'Ambiente elegante, comida extraordinaria. El pulpo a la parrilla es una obra maestra.', 'tripadvisor', true),
  ('Ricardo Montoya', 5, 'Celebramos nuestro aniversario aquí y fue mágico. El personal estuvo atento a cada detalle.', 'google', true)
ON CONFLICT DO NOTHING;

-- =============================================
-- FUNCIÓN: Auto-actualizar updated_at
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- FIN DEL SCRIPT
-- =============================================
SELECT 'Alfresco DB configurada exitosamente 🎉' AS resultado;
```

---

## VARIABLES DE ENTORNO (.env)

Después de crear el proyecto en Supabase, busca estos valores en:
**Settings → API** (panel izquierdo)

```env
VITE_SUPABASE_URL=https://TU-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=TU-ANON-PUBLIC-KEY
```

## NOTAS IMPORTANTES

- El RLS está activado en todas las tablas para máxima seguridad
- Las reservas son públicas (sin login) para facilitar la experiencia del cliente
- Los mensajes de contacto también se guardan sin login
- Para acceder al panel admin, crea un usuario en Authentication → Users y actualiza su rol a 'admin' en la tabla profiles
- Los buckets de Storage son públicos para que las imágenes se carguen sin autenticación
