// Productos generados automáticamente para TV, Computadores y Celulares
const tvBrands = ["Samsung", "LG", "Sony", "Xiaomi"];
const computerBrands = ["Dell", "Apple", "Lenovo", "HP", "Huawei", "LG"];
const phoneBrands = ["Apple", "Samsung", "Xiaomi", "Motorola", "Sony"];

let idCounter = 1000;

function genProducts(type: string, brands: string[], count: number, baseName: string, baseImg: string, basePrice: number, baseDesc: string) {
  // Selección de imagen según tipo
  let img = baseImg;
  if (/tv/i.test(baseName)) img = "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80";
  else if (/laptop|pc|notebook/i.test(baseName)) img = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80";
  else if (/celular|phone|telefono|móvil/i.test(baseName)) img = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80";
  else if (/tablet/i.test(baseName)) img = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80";
  else if (/audífono|headphone|auricular/i.test(baseName)) img = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80";
  else if (/watch|reloj/i.test(baseName)) img = "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80";
  return brands.flatMap(brand =>
    Array.from({ length: count }, (_, i) => ({
      id: `${type}-${brand}-${i + 1}-${idCounter++}`,
      name: `${baseName} ${brand} Modelo ${i + 1}`,
      brand,
      image: img,
      price: basePrice + (i + 1) * 10000,
      stock: 10 + ((i + 1) % 5),
      description: `${baseDesc} (${brand} Modelo ${i + 1})`
    }))
  );
}

// Imágenes libres de Unsplash para ejemplo
export const digitalProducts = [
  {
    id: '1',
    name: 'Laptop Dell Inspiron 15',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    price: 3200000,
    stock: 7,
    description: 'Laptop Dell 15.6" Intel Core i5, 8GB RAM, 512GB SSD.'
  },
  {
    id: '2',
    name: 'Apple MacBook Air M2',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    price: 5400000,
    stock: 5,
    description: 'MacBook Air 13" Chip M2, 8GB RAM, 256GB SSD.'
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    price: 3800000,
    stock: 10,
    description: 'Celular Samsung Galaxy S24, 256GB, 8GB RAM, 5G.'
  },
  {
    id: '4',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3c1b3ed4?auto=format&fit=crop&w=800&q=80',
    price: 6200000,
    stock: 6,
    description: 'Apple iPhone 15 Pro, 128GB, 5G, Titanio.'
  },
  {
    id: '5',
    name: 'Smart TV LG 55" 4K',
    brand: 'LG',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=800&q=80',
    price: 2700000,
    stock: 8,
    description: 'Televisor LG 55 pulgadas 4K UHD, webOS, HDR.'
  },
  {
    id: '6',
    name: 'Xiaomi Redmi Note 13',
    brand: 'Xiaomi',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    price: 1200000,
    stock: 15,
    description: 'Celular Xiaomi Redmi Note 13, 128GB, 6GB RAM.'
  },
  {
    id: '7',
    name: 'Lenovo ThinkPad X1',
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    price: 4100000,
    stock: 9,
    description: 'Laptop Lenovo ThinkPad X1 Carbon, 14" FHD, 16GB RAM.'
  },
  {
    id: '8',
    name: 'HP Pavilion 14',
    brand: 'HP',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    price: 2950000,
    stock: 10,
    description: 'Laptop HP Pavilion 14, Intel i5, 8GB RAM, 512GB SSD.'
  },
  {
    id: '9',
    name: 'Samsung Smart TV 65"',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    price: 3500000,
    stock: 7,
    description: 'Smart TV Samsung 65 pulgadas 4K UHD, Tizen.'
  },
  {
    id: '10',
    name: 'Huawei MateBook D15',
    brand: 'Huawei',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    price: 2600000,
    stock: 8,
    description: 'Laptop Huawei MateBook D15, Ryzen 5, 8GB RAM, 512GB SSD.'
  },
  {
    id: '11',
    name: 'Motorola Edge 40',
    brand: 'Motorola',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80',
    price: 2100000,
    stock: 12,
    description: 'Celular Motorola Edge 40, 256GB, 8GB RAM, 5G.'
  },
  {
    id: '12',
    name: 'Sony Bravia 50" 4K',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    price: 3200000,
    stock: 6,
    description: 'Smart TV Sony Bravia 50 pulgadas 4K, Android TV.'
  },
  {
    id: '13',
    name: 'Apple iPad 10th Gen',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    price: 2200000,
    stock: 10,
    description: 'iPad 10ª generación, 10.9", 64GB, WiFi.'
  },
  {
    id: '14',
    name: 'Samsung Galaxy Tab S9',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
    price: 2600000,
    stock: 8,
    description: 'Tablet Samsung Galaxy Tab S9, 11", 128GB, 5G.'
  },
  {
    id: '15',
    name: 'Xiaomi Mi TV 43"',
    brand: 'Xiaomi',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=800&q=80',
    price: 1500000,
    stock: 10,
    description: 'Smart TV Xiaomi 43 pulgadas 4K, Android TV.'
  },
  {
    id: '16',
    name: 'HP Envy x360',
    brand: 'HP',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    price: 4200000,
    stock: 5,
    description: 'Laptop HP Envy x360, 13.3" Touch, Ryzen 7, 16GB RAM.'
  },
  {
    id: '17',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
    price: 1800000,
    stock: 12,
    description: 'Apple Watch Series 9, 41mm, GPS.'
  },
  {
    id: '18',
    name: 'Samsung Galaxy Watch 6',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80',
    price: 1200000,
    stock: 14,
    description: 'Samsung Galaxy Watch 6, 44mm, Bluetooth.'
  },
  {
    id: '19',
    name: 'Lenovo Tab M10',
    brand: 'Lenovo',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    price: 900000,
    stock: 10,
    description: 'Tablet Lenovo Tab M10, 10.1", 64GB, WiFi.'
  },
  {
    id: '20',
    name: 'Sony Xperia 10 V',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3c1b3ed4?auto=format&fit=crop&w=800&q=80',
    price: 2100000,
    stock: 7,
    description: 'Celular Sony Xperia 10 V, 128GB, 6GB RAM, 5G.'
  },
  {
    id: '21',
    name: 'Dell XPS 13',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    price: 5200000,
    stock: 4,
    description: 'Laptop Dell XPS 13, 13.4" FHD, Intel i7, 16GB RAM.'
  },
  {
    id: '22',
    name: 'Motorola Moto G84',
    brand: 'Motorola',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    price: 1100000,
    stock: 15,
    description: 'Celular Motorola Moto G84, 128GB, 8GB RAM.'
  },
  {
    id: '23',
    name: 'LG Gram 16',
    brand: 'LG',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    price: 4800000,
    stock: 6,
    description: 'Laptop LG Gram 16, 16" WQXGA, Intel i7, 16GB RAM.'
  },
  {
    id: '24',
    name: 'Xiaomi Pad 6',
    brand: 'Xiaomi',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
    price: 1300000,
    stock: 13,
    description: 'Tablet Xiaomi Pad 6, 11", 128GB, WiFi.'
  },
  {
    id: '25',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80',
    price: 1500000,
    stock: 10,
    description: 'Audífonos Sony WH-1000XM5, Bluetooth, Noise Cancelling.'
  },
  {
    id: '26',
    name: 'Apple iPhone SE 2024',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3c1b3ed4?auto=format&fit=crop&w=800&q=80',
    price: 2100000,
    stock: 10,
    description: 'Apple iPhone SE 2024, 128GB, 5G.'
  }
]
.concat(
  genProducts(
    "tv",
    tvBrands,
    10,
    "Smart TV",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=400&q=80", // TV LG
    1800000,
    "Televisor 4K UHD, HDR, Smart TV"
  )
)
.concat(
  genProducts(
    "pc",
    computerBrands,
    10,
    "Laptop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80", // Laptop diferente
    2500000,
    "Laptop 15.6'' Intel/AMD, SSD, RAM expandible"
  )
)
.concat(
  genProducts(
    "phone",
    phoneBrands,
    10,
    "Celular",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80", // Celular diferente
    1200000,
    "Celular 5G, gran batería, cámara avanzada"
  )
)
.concat(
  genProducts(
    "tablet",
    ["Apple", "Samsung", "Lenovo", "Xiaomi"],
    5,
    "Tablet",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", // Tablet diferente
    1100000,
    "Tablet 10'' WiFi, gran batería, pantalla HD"
  )
)
.concat(
  genProducts(
    "headphones",
    ["Sony", "Apple", "Samsung", "JBL"],
    3,
    "Audífonos",
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80", // Audífonos diferentes
    600000,
    "Audífonos Bluetooth, cancelación de ruido"
  )
);
