








import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const BASE = import.meta.env.VITE_API_URL;


/* ── ICONS ── */
const Chevron = () => <svg className="chevron" viewBox="0 0 24 24" fill="black" width="10" height="10"><path d="M7 10l5 5 5-5z" /></svg>;
const IconAssignment = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M19.9818 11.1647V6.42118C19.9818 4.52359 19.9818 3.57479 19.5939 2.85001C19.2527 2.21247 18.7082 1.69414 18.0385 1.3693C17.2772 1 16.2805 1 14.2873 1H6.69454C4.70126 1 3.70463 1 2.9433 1.3693C2.27361 1.69414 1.72914 2.21247 1.38792 2.85001C1 3.57479 1 4.52359 1 6.42118V18.1671C1 20.0646 1 21.0134 1.38792 21.7382C1.72914 22.3758 2.27361 22.8941 2.9433 23.2189C3.70463 23.5882 4.70126 23.5882 6.69454 23.5882H10.4909M11.0841 11.1647H5.74545M6.93181 15.6824H5.74545M15.2363 6.64706H5.74545M14.7752 25V22.1765M14.8529 16.2471V13.4235M13.4033 14.8353H16.3025M13.3256 23.5882H16.2248M19.7815 13.9882L18.776 16.5344C18.6124 16.9485 18.5307 17.1555 18.4035 17.3296C18.2908 17.484 18.1524 17.6188 17.9939 17.7286C17.8151 17.8524 17.6025 17.932 17.1774 18.0913L14.563 19.0706L17.1774 20.0499C17.6025 20.2091 17.8151 20.2888 17.9939 20.4126C18.1524 20.5223 18.2908 20.6572 18.4035 20.8115C18.5307 20.9857 18.6124 21.1927 18.776 21.6068L19.7815 24.1529L20.787 21.6068C20.9505 21.1927 21.0323 20.9857 21.1594 20.8115C21.2721 20.6572 21.4106 20.5223 21.5691 20.4126C21.7479 20.2888 21.9605 20.2091 22.3856 20.0499L25 19.0706L22.3856 18.0913C21.9605 17.932 21.7479 17.8524 21.5691 17.7286C21.4106 17.6188 21.2721 17.484 21.1594 17.3297C21.0323 17.1555 20.9505 16.9485 20.787 16.5344L19.7815 13.9882Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>;
const IconPersonSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M21 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>;
const IconShoppingBag = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M8 8H8.01M2 5.2L2 9.67451C2 10.1637 2 10.4083 2.05526 10.6385C2.10425 10.8425 2.18506 11.0376 2.29472 11.2166C2.4184 11.4184 2.59135 11.5914 2.93726 11.9373L10.6059 19.6059C11.7939 20.7939 12.388 21.388 13.0729 21.6105C13.6755 21.8063 14.3245 21.8063 14.927 21.6105C15.612 21.388 16.2061 20.7939 17.3941 19.6059L19.6059 17.3941C20.7939 16.2061 21.388 15.612 21.6105 14.927C21.8063 14.3245 21.8063 13.6755 21.6105 13.0729C21.388 12.388 20.7939 11.7939 19.6059 10.6059L11.9373 2.93726C11.5914 2.59135 11.4184 2.4184 11.2166 2.29472C11.0376 2.18506 10.8425 2.10425 10.6385 2.05526C10.4083 2 10.1637 2 9.67452 2L5.2 2C4.0799 2 3.51984 2 3.09202 2.21799C2.7157 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2ZM8.5 8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8C7.5 7.72386 7.72386 7.5 8 7.5C8.27614 7.5 8.5 7.72386 8.5 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>;
const IconDescription = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M14 11H8M10 15H8M16 7H8M20 6.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H15.2C16.8802 2 17.7202 2 18.362 2.32698C18.9265 2.6146 19.3854 3.07354 19.673 3.63803C20 4.27976 20 5.11984 20 6.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>;
const IconAddCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M18 21V15M15 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>;
const IconWork = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M21 9.25H15M21 4H3M21 14.75H15M21 20H3M4.6 16H9.4C9.96005 16 10.2401 16 10.454 15.891C10.6422 15.7951 10.7951 15.6422 10.891 15.454C11 15.2401 11 14.9601 11 14.4V9.6C11 9.03995 11 8.75992 10.891 8.54601C10.7951 8.35785 10.6422 8.20487 10.454 8.10899C10.2401 8 9.96005 8 9.4 8H4.6C4.03995 8 3.75992 8 3.54601 8.10899C3.35785 8.20487 3.20487 8.35785 3.10899 8.54601C3 8.75992 3 9.03995 3 9.6V14.4C3 14.9601 3 15.2401 3.10899 15.454C3.20487 15.6422 3.35785 15.7951 3.54601 15.891C3.75992 16 4.03995 16 4.6 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>;
const IconArticle = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M21 9.25H15M21 4H3M21 14.75H15M21 20H3M4.6 16H9.4C9.96005 16 10.2401 16 10.454 15.891C10.6422 15.7951 10.7951 15.6422 10.891 15.454C11 15.2401 11 14.9601 11 14.4V9.6C11 9.03995 11 8.75992 10.891 8.54601C10.7951 8.35785 10.6422 8.20487 10.454 8.10899C10.2401 8 9.96005 8 9.4 8H4.6C4.03995 8 3.75992 8 3.54601 8.10899C3.35785 8.20487 3.20487 8.35785 3.10899 8.54601C3 8.75992 3 9.03995 3 9.6V14.4C3 14.9601 3 15.2401 3.10899 15.454C3.20487 15.6422 3.35785 15.7951 3.54601 15.891C3.75992 16 4.03995 16 4.6 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>;
const IconTrophy = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M12 15C8.68629 15 6 12.3137 6 9V3.44444C6 3.0306 6 2.82367 6.06031 2.65798C6.16141 2.38021 6.38021 2.16141 6.65798 2.06031C6.82367 2 7.0306 2 7.44444 2H16.5556C16.9694 2 17.1763 2 17.342 2.06031C17.6198 2.16141 17.8386 2.38021 17.9397 2.65798C18 2.82367 18 3.0306 18 3.44444V9C18 12.3137 15.3137 15 12 15ZM12 15V18M18 4H20.5C20.9659 4 21.1989 4 21.3827 4.07612C21.6277 4.17761 21.8224 4.37229 21.9239 4.61732C22 4.80109 22 5.03406 22 5.5V6C22 6.92997 22 7.39496 21.8978 7.77646C21.6204 8.81173 20.8117 9.62038 19.7765 9.89778C19.395 10 18.93 10 18 10M6 4H3.5C3.03406 4 2.80109 4 2.61732 4.07612C2.37229 4.17761 2.17761 4.37229 2.07612 4.61732C2 4.80109 2 5.03406 2 5.5V6C2 6.92997 2 7.39496 2.10222 7.77646C2.37962 8.81173 3.18827 9.62038 4.22354 9.89778C4.60504 10 5.07003 10 6 10M7.44445 22H16.5556C16.801 22 17 21.801 17 21.5556C17 19.5919 15.4081 18 13.4444 18H10.5556C8.59188 18 7 19.5919 7 21.5556C7 21.801 7.19899 22 7.44445 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
const IconHelp = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
  <path d="M9.08997 8.99999C9.32507 8.33166 9.78912 7.7681 10.3999 7.40912C11.0107 7.05015 11.7289 6.91893 12.4271 7.0387C13.1254 7.15848 13.7588 7.52151 14.215 8.06352C14.6713 8.60552 14.921 9.29151 14.92 9.99999C14.92 12 11.92 13 11.92 13M12 17H12.01M3 7.94145V16.0586C3 16.4012 3 16.5725 3.05048 16.7253C3.09515 16.8605 3.16816 16.9846 3.26463 17.0893C3.37369 17.2076 3.52345 17.2908 3.82297 17.4572L11.223 21.5683C11.5066 21.7259 11.6484 21.8047 11.7985 21.8355C11.9315 21.8629 12.0685 21.8629 12.2015 21.8355C12.3516 21.8047 12.4934 21.7259 12.777 21.5683L20.177 17.4572C20.4766 17.2908 20.6263 17.2076 20.7354 17.0893C20.8318 16.9846 20.9049 16.8605 20.9495 16.7253C21 16.5725 21 16.4012 21 16.0586V7.94145C21 7.5988 21 7.42748 20.9495 7.27468C20.9049 7.13951 20.8318 7.01542 20.7354 6.91073C20.6263 6.7924 20.4766 6.7092 20.177 6.54279L12.777 2.43168C12.4934 2.27412 12.3516 2.19535 12.2015 2.16446C12.0685 2.13713 11.9315 2.13713 11.7985 2.16446C11.6484 2.19535 11.5066 2.27412 11.223 2.43168L3.82297 6.54279C3.52345 6.7092 3.37369 6.7924 3.26463 6.91073C3.16816 7.01542 3.09515 7.13951 3.05048 7.27468C3 7.42748 3 7.5988 3 7.94145Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>;

const IconTrending = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
    <path d="M22 7L14.1314 14.8686C13.7354 15.2646 13.5373 15.4627 13.309 15.5368C13.1082 15.6021 12.8918 15.6021 12.691 15.5368C12.4627 15.4627 12.2646 15.2646 11.8686 14.8686L9.13137 12.1314C8.73535 11.7354 8.53735 11.5373 8.30902 11.4632C8.10817 11.3979 7.89183 11.3979 7.69098 11.4632C7.46265 11.5373 7.26465 11.7354 6.86863 12.1314L2 17M22 7H15M22 7V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
);

const IconSparkle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
    <path d="M4.5 22V17M4.5 7V2M2 4.5H7M2 19.5H7M13 3L11.2658 7.50886C10.9838 8.24209 10.8428 8.60871 10.6235 8.91709C10.4292 9.1904 10.1904 9.42919 9.91709 9.62353C9.60871 9.84281 9.24209 9.98381 8.50886 10.2658L4 12L8.50886 13.7342C9.24209 14.0162 9.60871 14.1572 9.91709 14.3765C10.1904 14.5708 10.4292 14.8096 10.6235 15.0829C10.8428 15.3913 10.9838 15.7579 11.2658 16.4911L13 21L14.7342 16.4911C15.0162 15.7579 15.1572 15.3913 15.3765 15.0829C15.5708 14.8096 15.8096 14.5708 16.0829 14.3765C16.3913 14.1572 16.7579 14.0162 17.4911 13.7342L22 12L17.4911 10.2658C16.7579 9.98381 16.3913 9.8428 16.0829 9.62353C15.8096 9.42919 15.5708 9.1904 15.3765 8.91709C15.1572 8.60871 15.0162 8.24209 14.7342 7.50886L13 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
);

const IconInfo = () => <svg viewBox="0 0 24 24" fill="black" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>;
const IconLogout = () => <svg viewBox="0 0 24 24" fill="black" width="16" height="16"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>;
const IconDashboard = () => <svg viewBox="0 0 24 24" fill="black" width="16" height="16"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>;
const IconAdmin = () => <svg viewBox="0 0 24 24" fill="black" width="16" height="16"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>;
const IconPerson = () => <svg viewBox="0 0 24 24" fill="black" width="16" height="16"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>;
const IconX = () => <svg viewBox="0 0 24 24" fill="black"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>;
const IconInstagram = () => <svg viewBox="0 0 24 24" fill="black"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
const IconPinterest = () => <svg viewBox="0 0 24 24" fill="black"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>;

function DdIconItem({ icon, title, sub }) {
  return (
    <a href="#" className="dd-icon-item">
      <div className="dd-icon-box">{icon}</div>
      <div>
        <div className="dd-icon-title">{title}</div>
        {sub && <div className="dd-icon-sub">{sub}</div>}
      </div>
    </a>
  );
}

function MobileAccordion({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mobile-acc-item">
      <button className={`mobile-acc-trigger ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
        {label}
        <svg viewBox="0 0 10 6" fill="none" stroke="black" strokeWidth="1.8"><path d="M1 1l4 4 4-4" /></svg>
      </button>
      {open && <div className="mobile-sub">{children}</div>}
    </div>
  );
}

/* ── USER AVATAR + DROPDOWN ── */
function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleLogout = () => { setOpen(false); onLogout(); navigate("/"); };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="user-avatar-btn" onClick={() => setOpen(o => !o)} title={user?.name}>
        <div className="user-avatar-circle">
          {user?.avatarUrl
            // ? <img src={user.avatarUrl} alt={user.name} className="user-avatar-img" />
            ? <img
              src={`${BASE}${user.avatarUrl}`}
              alt={user.name}
              className="user-avatar-img"
            />
            : <span className="user-avatar-initials">{initials}</span>
          }
        </div>
        <span className="user-display-name">{user?.name?.split(" ")[0]}</span>
        <Chevron />
      </button>

      {open && (
        <div className="user-dropdown">
          <div className="user-dropdown-header">
            <div className="user-avatar-circle" style={{ width: 40, height: 40, fontSize: 14 }}>
              {user?.avatarUrl
                // ? <img src={user.avatarUrl} alt={user.name} className="user-avatar-img" />
                ? <img
              src={`${BASE}${user.avatarUrl}`}
              alt={user.name}
              className="user-avatar-img"
            />
                : <span className="user-avatar-initials">{initials}</span>
              }
            </div>
            <div>
              <div className="user-dropdown-name">{user?.name}</div>
              <div className="user-dropdown-email">{user?.email}</div>
            </div>
          </div>

          <div className="user-dropdown-divider" />

          <Link to="/dashboard" className="user-dropdown-item" onClick={() => setOpen(false)}>
            <IconDashboard /> My Dashboard
          </Link>

          {user?.role === "ADMIN" && (
            <Link to="/admin" className="user-dropdown-item user-dropdown-item--admin" onClick={() => setOpen(false)}>
              <IconAdmin /> Admin Panel
            </Link>
          )}

          <Link to="/profile" className="user-dropdown-item" onClick={() => setOpen(false)}>
            <IconPerson /> Edit Profile
          </Link>

          <div className="user-dropdown-divider" />

          <button className="user-dropdown-item user-dropdown-item--logout" onClick={handleLogout}>
            <IconLogout /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════
   MAIN NAVBAR
══════════════════════════════ */



export default function Navbar({ user, onLogout }) {


  const [mobileOpen, setMobileOpen] = useState(false);
  const exploreItems = [

    { label: "Popular", icon: <IconTrending /> },
    { label: "New and Noteworthy", icon: <IconSparkle /> },
    { divider: true },
    { label: "Product Design" },
    { label: "Web Design" },
    { label: "Animation" },
    { label: "Branding" },
    { label: "Illustration" },
    { label: "Mobile" },
    { label: "Typography" },
    { label: "Print" },
  ];
  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <img src="/Logo.svg" alt="Dribbble" className="logo-img"
            onError={e => { e.target.style.display = "none"; }} />

        </a>

        {/* Desktop links */}
        <div className="navbar-links">
          <div className="nav-item">
            <button className="nav-btn">Explore <Chevron /></button>
            <div className="dropdown">
              <div className="dd-section-label">Discover</div>
              <a href="#" className="dd-simple"><span className="dd-simple-dot" /><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
                <path d="M22 7L14.1314 14.8686C13.7354 15.2646 13.5373 15.4627 13.309 15.5368C13.1082 15.6021 12.8918 15.6021 12.691 15.5368C12.4627 15.4627 12.2646 15.2646 11.8686 14.8686L9.13137 12.1314C8.73535 11.7354 8.53735 11.5373 8.30902 11.4632C8.10817 11.3979 7.89183 11.3979 7.69098 11.4632C7.46265 11.5373 7.26465 11.7354 6.86863 12.1314L2 17M22 7H15M22 7V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>Popular</a>
              <a href="#" className="dd-simple"><span className="dd-simple-dot" /><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon ">
                <path d="M4.5 22V17M4.5 7V2M2 4.5H7M2 19.5H7M13 3L11.2658 7.50886C10.9838 8.24209 10.8428 8.60871 10.6235 8.91709C10.4292 9.1904 10.1904 9.42919 9.91709 9.62353C9.60871 9.84281 9.24209 9.98381 8.50886 10.2658L4 12L8.50886 13.7342C9.24209 14.0162 9.60871 14.1572 9.91709 14.3765C10.1904 14.5708 10.4292 14.8096 10.6235 15.0829C10.8428 15.3913 10.9838 15.7579 11.2658 16.4911L13 21L14.7342 16.4911C15.0162 15.7579 15.1572 15.3913 15.3765 15.0829C15.5708 14.8096 15.8096 14.5708 16.0829 14.3765C16.3913 14.1572 16.7579 14.0162 17.4911 13.7342L22 12L17.4911 10.2658C16.7579 9.98381 16.3913 9.8428 16.0829 9.62353C15.8096 9.42919 15.5708 9.1904 15.3765 8.91709C15.1572 8.60871 15.0162 8.24209 14.7342 7.50886L13 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>New and Noteworthy</a>
              <div className="dd-divider" />
              <div className="dd-section-label">Categories</div>
              {["Product Design", "Web Design", "Animation", "Branding", "Illustration", "Mobile", "Typography", "Print"].map(c => (
                <a key={c} href="#" className="dd-simple"><span className="dd-simple-dot" />{c}</a>
              ))}
            </div>
          </div>

          <div className="nav-item">
            <button className="nav-btn">Hire Talent <Chevron /></button>
            <div className="dropdown dropdown-wide">
              <div className="dd-col-left">
                <DdIconItem icon={<IconAssignment />} title="Start Project Brief" sub="Get recommendations and proposals" />
                <DdIconItem icon={<IconPersonSearch />} title="Browse Profiles" sub="Find and message talent directly" />
                <DdIconItem icon={<IconShoppingBag />} title="Explore Services" sub="Hire quickly with pre-packaged services" />
                <div className="dd-divider" />
                <a href="#" className="dd-footer-link"><IconInfo /> Learn more about how hiring works on Dribbble →</a>
              </div>
              <div className="dd-col-right">
                <a href="#" className="dd-right-link">Browse Design Agencies</a>
                <a href="#" className="dd-right-link">Post a Full-Time Job</a>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <button className="nav-btn">Get Hired <Chevron /></button>
            <div className="dropdown dropdown-wide">
              <div className="dd-col-left">
                <DdIconItem icon={<IconDescription />} title="Browse Project Briefs" sub="Send proposals to clients" />
                <DdIconItem icon={<IconAddCircle />} title="Add a Service" sub="Let clients purchase your services" />
                <DdIconItem icon={<IconWork />} title="Apply to Full-Time Jobs" sub="View open design roles" />
                <div className="dd-divider" />
                <a href="#" className="dd-footer-link"><IconInfo /> Learn more about getting hired on Dribbble →</a>
              </div>
              <div className="dd-col-right">
                <a href="#" className="dd-right-link">Upgrade to Pro</a>
                <a href="#" className="dd-right-link">Advertise with Us</a>
              </div>
            </div>
          </div>

          <div className="nav-item">
            <button className="nav-btn">Community <Chevron /></button>
            <div className="dropdown" style={{ minWidth: 290 }}>
              <DdIconItem icon={<IconArticle />} title="Blog" sub="Design inspiration, stories, and tips" />
              <DdIconItem icon={<IconTrophy />} title="Playoffs" sub="Join creative challenges and show your skills" />
              <DdIconItem icon={<IconHelp />} title="Help Center" sub="Get quick answers and learn how to use Dribbble" />
              <div className="dd-divider" />
              <div className="dd-section-label">Follow Us</div>
              <div className="dd-social-row">
                <a href="#" className="dd-social-icon" title="X"><IconX /></a>
                <a href="#" className="dd-social-icon" title="Instagram"><IconInstagram /></a>
                <a href="#" className="dd-social-icon" title="Pinterest"><IconPinterest /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="navbar-right">
          {user ? (
            <UserMenu user={user} onLogout={onLogout} />
          ) : (
            <>
              <Link to="/signup" className="btn-signup">Sign up</Link>
              <Link to="/login" className="btn-login">Log in</Link>
            </>
          )}
          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}

      {mobileOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <span className="mobile-menu-logo"><a href="/"><img src="/Logo.svg" alt="logo" className="logo-img" /></a></span>
              <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            {user && (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">
                  {user.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="mobile-user-name">{user.name}</div>
                  <div className="mobile-user-email">{user.email}</div>
                </div>
              </div>
            )}


            <MobileAccordion label="Explore">

              {exploreItems.map((item, i) => {
                if (item.divider) {
                  return <div key={i} className="mobile-divider" />;
                }

                return (
                  <a key={item.label} href="#" className="mobile-sub-link with-icon">
                    {item.icon && <span className="mobile-link-icon">{item.icon}</span>}
                    {item.label}
                  </a>
                );
              })}
            </MobileAccordion>
            {/* <MobileAccordion label="Hire Talent">
              {["Start Project Brief", "Browse Profiles", "Explore Services", "Browse Design Agencies", "Post a Full-Time Job"].map(l => (
                <a key={l} href="#" className="mobile-sub-link">{l}</a>
              ))}
            </MobileAccordion> */}

            <MobileAccordion label="Hire Talent">

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconAssignment /></div>
                <div>
                  <div className="mobile-title">Start Project Brief</div>
                  <div className="mobile-desc">Get recommendations and proposals</div>
                </div>
              </div>

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconPersonSearch /></div>
                <div>
                  <div className="mobile-title">Browse Profiles</div>
                  <div className="mobile-desc">Find and message talent directly</div>
                </div>
              </div>

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconShoppingBag /></div>
                <div>
                  <div className="mobile-title">Explore Services</div>
                  <div className="mobile-desc">Hire quickly with pre-packaged services</div>
                </div>
              </div>



              <div className="mobile-simple-link">Browse Design Agencies →</div>
              <div className="mobile-simple-link">Post a Full-Time Job →</div>
              <div className="mobile-divider" />

              <a href="#" class="dd-footer-link"><svg viewBox="0 0 24 24" fill="black" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg> Learn more about how hiring works on Dribbble →</a>

            </MobileAccordion>
            <MobileAccordion label="Get Hired">

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconDescription /></div>
                <div>
                  <div className="mobile-title">Browse Project Briefs</div>
                  <div className="mobile-desc">Pitch clients ready to hire now</div>
                </div>
              </div>

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconAddCircle /></div>
                <div>
                  <div className="mobile-title">Add Service</div>
                  <div className="mobile-desc">Let clients purchase your services</div>
                </div>
              </div>

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconWork /></div>
                <div>
                  <div className="mobile-title">Apply to Full-Time Jobs</div>
                  <div className="mobile-desc">View open design roles</div>
                </div>
              </div>



              <div className="mobile-simple-link">Upgrade to Pro →</div>
              <div className="mobile-simple-link">Advertise with Us →</div>
              <div className="mobile-divider" />
              <a href="#" class="dd-footer-link"><svg viewBox="0 0 24 24" fill="black" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg> Learn more about how hiring works on Dribbble →</a>

            </MobileAccordion>
            <MobileAccordion label="Community">

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconArticle /></div>
                <div>
                  <div className="mobile-title">Blog</div>
                  <div className="mobile-desc">Design inspiration, stories, and tips</div>
                </div>
              </div>

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconTrophy /></div>
                <div>
                  <div className="mobile-title">Playoffs</div>
                  <div className="mobile-desc">Join creative challenges and show your skills</div>
                </div>
              </div>

              <div className="mobile-rich-item">
                <div className="mobile-icon"><IconHelp /></div>
                <div>
                  <div className="mobile-title">Help Center</div>
                  <div className="mobile-desc">Get quick answers and learn how to use Dribbble</div>
                </div>
              </div>

              <div className="mobile-divider" />

              {/* Follow section */}
              <div className="mobile-follow">

                <div className="follow-icons">
                  <span className="follow-label">Follow Us</span>
                  <span className="social-icon"><IconInstagram /></span>
                  <span className="social-icon"><IconX /></span>
                  <span className="social-icon"><IconPinterest /></span>
                </div>
              </div>

            </MobileAccordion>

            <div className="mobile-cta">
              {user ? (
                <>
                  <Link to="/dashboard" className="mobile-btn-dark" onClick={() => setMobileOpen(false)}>My Dashboard</Link>
                  {user.role === "ADMIN" && (
                    <Link to="/admin" className="mobile-btn-dark" style={{ background: "#ea4c89" }} onClick={() => setMobileOpen(false)}>Admin Panel</Link>
                  )}
                  <button className="mobile-btn-ghost" onClick={() => { onLogout(); setMobileOpen(false); }}>
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mobile-btn-dark" onClick={() => setMobileOpen(false)}>Log in</Link>
                  <Link to="/signup" className="mobile-btn-pink" onClick={() => setMobileOpen(false)}>Sign up — it's free</Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}