export default function InlineStyles() {
  return (
    <style jsx global>{`
      /* Critical CSS that will be inlined in the HTML */
      body {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        color: #0f172a;
        background-color: #f8fafc;
        margin: 0;
        padding: 0;
        line-height: 1.5;
      }
      
      .container {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        padding: 0 1.5rem;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      h1 {
        font-size: 2.5rem;
      }
      
      h2 {
        font-size: 2rem;
      }
      
      h3 {
        font-size: 1.75rem;
      }
      
      a {
        color: #0ea5e9;
        text-decoration: none;
      }
      
      button, .button {
        background-color: #0ea5e9;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
      }
      
      section {
        padding: 5rem 0;
      }
    `}</style>
  );
} 