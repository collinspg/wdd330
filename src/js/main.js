// Main entry point for the application
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Modal from "./modal.mjs";
//js for the main html page
const title = "🎁 Register Now & Win! 🎁";
const message = "Sign up on your first visit and get a chance to win premium camping gear tents, sleeping bags, and more! 🏕️";
const modal = new Modal(title, message, true);
modal.ShowModal();


//load header/footer wk 3
loadHeaderFooter();