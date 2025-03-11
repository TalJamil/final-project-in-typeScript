import React, { useState, useEffect } from "react";
import "../styles/QuoteBox.css";

interface Quote {
  content: string;
  author: string;
}

/**
 * קומפוננטת QuoteBox:
 * קומפוננטה זו מציגה ציטוטים אקראיים שמתקבלים מ-API חיצוני.
 * 
 * איך היא פועלת:
 * - כאשר הקומפוננטה נטענת, היא מביאה ציטוט אקראי באמצעות הפונקציה fetchQuote.
 * - בנוסף, היא מביאה ציטוט חדש בכל דקה באופן אוטומטי בעזרת setInterval.
 * - המשתמש יכול גם ללחוץ על כפתור כדי להביא ציטוט חדש באופן מיידי.
 */

const QuoteBox: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect((): (() => void) => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 60000); 
    return () => clearInterval(interval);
  }, []);

  /**
   * פונקציה אסינכרונית שאחראית על הבאת ציטוט אקראי מ-API חיצוני.
   * 
   * איך היא פועלת:
   * - מבצעת בקשה ל-API בכתובת "http://api.quotable.io/random".
   * - מחכה לתשובת השרת וממירה אותה לפורמט JSON.
   * - בודקת אם התגובה מכילה תוכן תקין (אם יש שדות content ו-author).
   */
  const fetchQuote = async (): Promise<void> => {
    try {
      const response = await fetch("http://api.quotable.io/random");
      const data = await response.json();
      if (data && data.content && data.author) {
        setQuote({ content: data.content, author: data.author });
      } else {
        console.error("Invalid quote structure:", data);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  return (
    <div className="quote-container">
        <h3> 🌟ציטוטים נותני השראה</h3>
      {quote ? (
        <>
          <p className="quote-content">"{quote.content}"</p>
          <p className="quote-author">- {quote.author}</p>
        </>
      ) : (
        <p>טוען ציטוט...</p>
      )}
      <button className="fetch-quote-btn" onClick={fetchQuote}>💬 ציטוט נוסף</button>
    </div>
  );
};

export default QuoteBox;