export const cartReducer = (state, { type, payload }) => {
    switch (type){
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, { ...payload, quantity: 1 }]
            }
            
        case "DECREMENT":
            return {
                ...state,
                cart: state.cart.map(product => product.id === payload ? { ...product, quantity: product.quantity - 1 } : product)
            }
        
        case "INCREMENT":
            return {
                ...state,
                cart: state.cart.map(product => product.id === payload ? { ...product, quantity: product.quantity + 1 } : product)
            }

        case "REMOVE":
                return {
                    ...state,
                    cart: [...state.cart, { ...payload, quantity: 1 }]
                }
        case "REM":
            console.warn(payload)
            return{
                ...state,
                cart:state.cart.filter(item => item.id !== payload)
            }
        default:
            return state
    }
}
