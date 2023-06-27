import { CartRepository } from "./cart.repository.js";
import { ProductRepository } from "./products.repository.js";
import { TicketRepository } from "./ticket.repository.js";
import { UserRepository } from "./user.repository.js";

export const cartRepository = new CartRepository();
export const productRepository = new ProductRepository();
export const ticketRepository = new TicketRepository();
export const userRepository = new UserRepository();