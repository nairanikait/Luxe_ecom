const Product = require('../models/productModel');
const { cloudinary } = require('../config/cloudinary');

// Helper to upload image (either base64 data URL or fallback)
const uploadImage = async (imageStr) => {
  try {
    if (!imageStr || typeof imageStr !== 'string') {
      return 'https://images.unsplash.com/photo-1571781526291-c477ebef020d?w=600&q=80&fit=crop';
    }
    
    // If it's already an HTTP link, just return it
    if (imageStr.startsWith('http://') || imageStr.startsWith('https://')) {
      return imageStr;
    }

    // If it is a base64 image data URL, upload to Cloudinary
    if (imageStr.startsWith('data:image')) {
      // Skip uploading if dummy Cloudinary credentials are set to avoid long timeouts
      if (process.env.CLOUDINARY_CLOUD_NAME === 'mock_cloud') {
        console.log("Mock Cloudinary: returning mock image url instead of real upload.");
        return 'https://images.unsplash.com/photo-1571781526291-c477ebef020d?w=600&q=80&fit=crop';
      }
      const result = await cloudinary.uploader.upload(imageStr, {
        folder: 'luxe_products'
      });
      return result.secure_url;
    }

    return imageStr;
  } catch (error) {
    console.error("Cloudinary upload failed, using fallback:", error.message);
    return 'https://images.unsplash.com/photo-1571781526291-c477ebef020d?w=600&q=80&fit=crop';
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    console.error('List products error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, sku, variant, price, category, stock, description, details, images, colors, sizes } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ success: false, message: 'Please provide Name, Price, and Stock.' });
    }

    // Process uploaded images
    const imageUrls = [];
    if (images && Array.isArray(images)) {
      for (const img of images) {
        const url = await uploadImage(img);
        imageUrls.push(url);
      }
    }

    if (imageUrls.length === 0) {
      imageUrls.push('https://images.unsplash.com/photo-1571781526291-c477ebef020d?w=600&q=80&fit=crop');
    }

    const product = await Product.create({
      name,
      sku: sku || `SKU-${Math.floor(10000 + Math.random() * 90000)}`,
      variant: variant || 'CHARCOAL',
      price: Number(price),
      category: category || 'Outerwear',
      stock: Number(stock),
      description: description || '',
      details: details || ['Premium blend materials', 'Professional clean only'],
      images: imageUrls,
      colors: colors || [{ label: 'Charcoal', hex: '#374151' }],
      sizes: sizes || ['S', 'M', 'L']
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Add product error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product removed from catalog.' });
  } catch (error) {
    console.error('Remove product error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id, name, sku, variant, price, category, stock, description, details, images, colors, sizes } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Process new images
    const imageUrls = [];
    if (images && Array.isArray(images)) {
      for (const img of images) {
        const url = await uploadImage(img);
        imageUrls.push(url);
      }
    }

    const updateFields = {
      name: name !== undefined ? name : existingProduct.name,
      sku: sku !== undefined ? sku : existingProduct.sku,
      variant: variant !== undefined ? variant : existingProduct.variant,
      price: price !== undefined ? Number(price) : existingProduct.price,
      category: category !== undefined ? category : existingProduct.category,
      stock: stock !== undefined ? Number(stock) : existingProduct.stock,
      description: description !== undefined ? description : existingProduct.description,
      details: details !== undefined ? details : existingProduct.details,
      images: imageUrls.length > 0 ? imageUrls : existingProduct.images,
      colors: colors !== undefined ? colors : existingProduct.colors,
      sizes: sizes !== undefined ? sizes : existingProduct.sizes
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true });

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Update product error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  listProducts,
  addProduct,
  removeProduct,
  updateProduct
};
