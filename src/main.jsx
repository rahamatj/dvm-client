import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')).render(
	<StrictMode>
        <ToastContainer position="top-right" autoClose={3000} />
		<App />
	</StrictMode>,
);
