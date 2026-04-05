import { createContext, useContext, useState, type ReactNode } from "react";
import type { SelectedArticle } from "@/features/granary/types";
import { mockDelistArticles } from "@/features/granary/mock-data/delist-mock";

interface DelistWizardContextType {
  currentStep: 1 | 2 | 3;
  setCurrentStep: (step: 1 | 2 | 3) => void;
  selectedArticles: SelectedArticle[];
  removeArticle: (code: string) => void;
  activeArticleCode: string;
  setActiveArticleCode: (code: string) => void;
  storeTargetingMode: Record<string, "affected" | "ranged" | "custom">;
  setStoreTargetingMode: (
    code: string,
    mode: "affected" | "ranged" | "custom",
  ) => void;
  globalReason: string;
  setGlobalReason: (reason: string) => void;
  articleReasons: Record<string, string>;
  setArticleReason: (code: string, reason: string) => void;
  applyGlobalReason: () => void;
}

const DelistWizardContext = createContext<DelistWizardContextType | null>(null);

export function useDelistWizard(): DelistWizardContextType {
  const context = useContext(DelistWizardContext);
  if (!context) {
    throw new Error(
      "useDelistWizard must be used within a DelistWizardProvider",
    );
  }
  return context;
}

export function DelistWizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedArticles, setSelectedArticles] = useState<SelectedArticle[]>(
    mockDelistArticles.map((a) => ({
      articleCode: a.articleCode,
      articleName: a.articleName,
      subCategory: a.subCategory,
      affectedCount: a.affectedCount,
      rangedCount: a.rangedCount,
    })),
  );
  const [activeArticleCode, setActiveArticleCode] = useState<string>(
    mockDelistArticles[0]?.articleCode ?? "",
  );
  const [storeTargetingMode, setStoreTargetingModeMap] = useState<
    Record<string, "affected" | "ranged" | "custom">
  >(() => {
    const initial: Record<string, "affected" | "ranged" | "custom"> = {};
    for (const a of mockDelistArticles) {
      initial[a.articleCode] = "ranged";
    }
    return initial;
  });
  const [globalReason, setGlobalReason] = useState<string>("");
  const [articleReasons, setArticleReasons] = useState<Record<string, string>>(
    {},
  );

  function removeArticle(code: string) {
    setSelectedArticles((prev) => prev.filter((a) => a.articleCode !== code));
    if (activeArticleCode === code) {
      setActiveArticleCode((prev) => {
        const remaining = selectedArticles.filter(
          (a) => a.articleCode !== code,
        );
        return remaining[0]?.articleCode ?? prev;
      });
    }
  }

  function setStoreTargetingMode(
    code: string,
    mode: "affected" | "ranged" | "custom",
  ) {
    setStoreTargetingModeMap((prev) => ({ ...prev, [code]: mode }));
  }

  function setArticleReason(code: string, reason: string) {
    setArticleReasons((prev) => ({ ...prev, [code]: reason }));
  }

  function applyGlobalReason() {
    if (!globalReason) return;
    setArticleReasons((prev) => {
      const updated = { ...prev };
      for (const article of selectedArticles) {
        updated[article.articleCode] = globalReason;
      }
      return updated;
    });
  }

  return (
    <DelistWizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedArticles,
        removeArticle,
        activeArticleCode,
        setActiveArticleCode,
        storeTargetingMode,
        setStoreTargetingMode,
        globalReason,
        setGlobalReason,
        articleReasons,
        setArticleReason,
        applyGlobalReason,
      }}
    >
      {children}
    </DelistWizardContext.Provider>
  );
}
