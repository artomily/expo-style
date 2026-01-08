import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  type AuthError,
  type User as FirebaseUser
} from "firebase/auth";
import { Platform } from "react-native";
import type { AppUser, UserRole } from "@/shared/types/app";
import { auth } from "@/shared/api/firebase";

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  authActionLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  switchRole: () => void;
  role: UserRole;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mapFirebaseUser = (
  firebaseUser: FirebaseUser | null,
  role: UserRole
): AppUser | null => {
  if (!firebaseUser) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    displayName:
      firebaseUser.displayName ||
      (firebaseUser.isAnonymous ? "Guest Trader" : "Setra Member"),
    email: firebaseUser.email,
    role
  };
};

export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authActionLoading, setAuthActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>("Member");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(mapFirebaseUser(firebaseUser, role));
        setLoading(false);
        setError(null);
      },
      (authError) => {
        console.error("Auth listener failed", authError);
        setUser(null);
        setError("Tidak dapat memuat sesi Anda. Silakan coba login ulang.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [role]);

  const signInWithGoogle = useCallback(async () => {
    setAuthActionLoading(true);
    setError(null);

    if (Platform.OS !== "web") {
      setError("Login Google hanya tersedia di versi web saat ini. Gunakan login tamu untuk demo.");
      setAuthActionLoading(false);
      return;
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      const authError = err as AuthError;
      console.error("Google login failed", authError);
      const errorMessage =
        authError.code === "auth/unauthorized-domain"
          ? "Domain preview belum terdaftar di Google. Gunakan opsi Tamu untuk mencoba demo."
          : authError.message || "Gagal login dengan Google.";
      setError(errorMessage);
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const signInAsGuest = useCallback(async () => {
    setAuthActionLoading(true);
    setError(null);
    try {
      await signInAnonymously(auth);
    } catch (err) {
      const authError = err as AuthError;
      console.error("Guest login failed", authError);
      setError(authError.message || "Gagal login sebagai tamu.");
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setError(null);
    await signOut(auth);
  }, []);

  const switchRole = useCallback(() => {
    setRole((prev) => {
      const nextRole: UserRole = prev === "Member" ? "Mentor" : "Member";
      setUser((current) =>
        current
          ? {
            ...current,
            role: nextRole,
            displayName:
              current.displayName ||
              (nextRole === "Mentor" ? "Master Trader" : "Member01")
          }
          : current
      );
      return nextRole;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      authActionLoading,
      error,
      signInWithGoogle,
      signInAsGuest,
      signOut: signOutUser,
      clearError: () => setError(null),
      switchRole,
      role
    }),
    [
      authActionLoading,
      error,
      loading,
      signInAsGuest,
      signInWithGoogle,
      signOutUser,
      user,
      switchRole,
      role
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
