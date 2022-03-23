import { createContext, useCallback, useEffect, useState } from "react";

export const userContext = createContext({});

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback((u) => {
    setUser(u);
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res.status;
      })
      .then((user) => {
        setUser(user);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <userContext.Provider value={{ user, login }}>
      {loading ? null : children}
    </userContext.Provider>
  );
};

export default UserContext;