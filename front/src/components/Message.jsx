import { useState, useEffect } from "react";
function Message({message,type}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      // Après 5 secondes, le message sera masqué
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 3500);
  
      // Nettoyer le timeout si le composant est démonté avant l'expiration du délai
      return () => clearTimeout(timeout);
    }, []);
  
    // Si le message n'est pas visible, ne pas le rendre
    if (!visible) return null;
  return (
    <p className={`auth__message--error ${type==="error"?"error-message":"success-message"}`} style={{ textAlign: "left" }}>
      {message}
    </p>
  )
}

export default Message
