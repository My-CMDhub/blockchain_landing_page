"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Product = {
  id: string
  name: string
  price: number
  ethPrice: number
  maticPrice: number
  bnbPrice: number
  image: string
  description: string
  category: string
  features: string[]
}

type CartItem = {
  product: Product
  quantity: number
}

type CartContextType = {
  products: Product[]
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  selectedCrypto: string | null
  setSelectedCrypto: (crypto: string) => void
  getCartTotal: () => number
  getCartTotalInCrypto: () => number
  isCartLoaded: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Reusable Water Bottle",
    price: 19.99,
    ethPrice: 0.00510289,
    maticPrice: 49.975,
    bnbPrice: 0.01929,
    image: "https://plus.unsplash.com/premium_photo-1681154819686-43fcc4dc4df3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym90dGxlfGVufDB8fDB8fHww",
    description: "Premium stainless steel water bottle designed for durability and sustainability. Keep your drinks hot or cold for hours with double-wall vacuum insulation.",
    category: "eco",
    features: [
      "BPA-free stainless steel construction",
      "24-hour cold / 12-hour hot temperature retention",
      "Leak-proof design with secure lid"
    ]
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    price: 249.99,
    ethPrice: 0.0637913,
    maticPrice: 624.975,
    bnbPrice: 0.24121,
    image: "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Advanced smartwatch with health monitoring, fitness tracking, and seamless smartphone connectivity.",
    category: "tech",
    features: [
      "Heart rate and sleep monitoring",
      "Water resistant up to 50m",
      "7-day battery life"
    ]
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    price: 99.99,
    ethPrice: 0.0255144,
    maticPrice: 249.975,
    bnbPrice: 0.09646,
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Premium wireless earbuds with noise cancellation and crystal-clear sound quality for immersive listening.",
    category: "audio",
    features: [
      "Active noise cancellation",
      "8-hour battery life + 24 hours with charging case",
      "Water and sweat resistant"
    ]
  },
  {
    id: "4",
    name: "Eco-Friendly Backpack",
    price: 79.99,
    ethPrice: 0.0204116,
    maticPrice: 199.975,
    bnbPrice: 0.07716,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Sustainable backpack made from recycled materials with multiple compartments for all your essentials.",
    category: "eco",
    features: [
      "Made from 100% recycled polyester",
      "Laptop compartment fits up to 15-inch devices",
      "Water-resistant exterior"
    ]
  },
  {
    id: "5",
    name: "Portable Power Bank",
    price: 49.99,
    ethPrice: 0.0127572,
    maticPrice: 124.975,
    bnbPrice: 0.04822,
    image: "https://images.unsplash.com/photo-1585011664466-b7bbe92f34ef?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "High-capacity portable charger to keep your devices powered on the go. Fast charging for smartphones, tablets, and more.",
    category: "tech",
    features: [
      "20,000mAh capacity",
      "USB-C PD fast charging",
      "Charge multiple devices simultaneously"
    ]
  }
]

// Validate CartItem structure
const validateCartItem = (item: any): item is CartItem => {
  return (
    item && 
    typeof item === 'object' &&
    'product' in item && 
    item.product && 
    typeof item.product === 'object' &&
    'id' in item.product &&
    typeof item.product.id === 'string' &&
    'quantity' in item &&
    typeof item.quantity === 'number'
  )
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(defaultProducts)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
  const [isCartLoaded, setIsCartLoaded] = useState(false)
  
  // Initialize from localStorage on client side
  useEffect(() => {
    try {
      // Load cart items
      const storedCart = localStorage.getItem("cart")
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart)
          
          // Validate cart structure
          if (Array.isArray(parsedCart)) {
            // Filter out invalid items
            const validCartItems = parsedCart.filter(validateCartItem)
            
            // Check for product references against current product list
            const validatedCart = validCartItems.map(item => {
              // Find matching product from products list to ensure up-to-date data
              const currentProduct = products.find(p => p.id === item.product.id)
              if (currentProduct) {
                return {
                  product: currentProduct,
                  quantity: item.quantity
                }
              }
              return item
            }).filter(item => item !== null)
            
            setCartItems(validatedCart)
          }
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error)
          localStorage.removeItem("cart") // Remove invalid data
        }
      }
      
      // Load selected crypto
      const storedCrypto = localStorage.getItem("selectedCrypto")
      if (storedCrypto) {
        setSelectedCrypto(storedCrypto)
      }
      
      setIsCartLoaded(true)
    } catch (error) {
      console.error("Error initializing cart from localStorage:", error)
      setIsCartLoaded(true)
    }
  }, [products])
  
  // Save to localStorage when cart changes
  useEffect(() => {
    if (isCartLoaded) {
      if (cartItems.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cartItems))
      } else {
        localStorage.removeItem("cart")
      }
    }
  }, [cartItems, isCartLoaded])
  
  // Save selected crypto to localStorage
  useEffect(() => {
    if (isCartLoaded) {
      if (selectedCrypto) {
        localStorage.setItem("selectedCrypto", selectedCrypto)
      } else {
        localStorage.removeItem("selectedCrypto")
      }
    }
  }, [selectedCrypto, isCartLoaded])
  
  const addToCart = (product: Product) => {
    if (!product || !product.id) return
    
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item && item.product && item.product.id === product.id
      )
      
      if (existingItem) {
        return prev.map(item => 
          item && item.product && item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      } else {
        return [...prev, { product, quantity: 1 }]
      }
    })
  }
  
  const removeFromCart = (productId: string) => {
    if (!productId) return
    
    setCartItems(prev => prev.filter(item => 
      !(item && item.product && item.product.id === productId)
    ))
  }
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (!productId) return
    
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item && item.product && item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    )
  }
  
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cart")
  }
  
  const getCartTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0
    
    return cartItems.reduce((total, item) => {
      if (item && item.product && typeof item.product.price === 'number' && typeof item.quantity === 'number') {
        return total + (item.product.price * item.quantity)
      }
      return total
    }, 0)
  }
  
  const getCartTotalInCrypto = () => {
    if (!selectedCrypto || !cartItems || cartItems.length === 0) return 0
    
    return cartItems.reduce((total, item) => {
      if (!(item && item.product)) return total
      
      switch (selectedCrypto) {
        case 'ETH':
          return total + (item.product.ethPrice * item.quantity)
        case 'MATIC':
          return total + (item.product.maticPrice * item.quantity)
        case 'BNB':
          return total + (item.product.bnbPrice * item.quantity)
        default:
          return total
      }
    }, 0)
  }
  
  return (
    <CartContext.Provider value={{
      products,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      selectedCrypto,
      setSelectedCrypto,
      getCartTotal,
      getCartTotalInCrypto,
      isCartLoaded
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 