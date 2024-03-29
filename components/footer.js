import React from 'react';

const Footer = () => {
    return (
      <footer>
        <p className="github">
            <a href="https://github.com/LX-GQG/onlyBlog">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">
                <path d="M256 32C132.3 32 32 134.9 32 261.7a229.3 229.3 0 00153.2 217.9 17.6 17.6 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4l-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6a84.6 84.6 0 012.2-60.8 18.6 18.6 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.2 208.2 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.6 18.6 0 015 .5 84.6 84.6 0 012.2 60.8 90.3 90.3 0 0123 61.6c0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.4 19.4 0 004-.4A229.2 229.2 0 00480 261.7C480 134.9 379.7 32 256 32z"/>
                </svg>
                https://github.com/LX-GQG/onlyBlog          
            </a>
        </p>
        <style>{`
          footer {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 1rem;
              background: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .github {
              display: flex;
              align-items: center;
              font-size: 1.2rem;
          }
          .github a {
              display: flex;
              align-items: center;
              color: #333;
              text-decoration: none;
          }
          .github svg {
              margin-right: 0.5rem;
          }
        `}</style>
      </footer>
    );
}

export default Footer;