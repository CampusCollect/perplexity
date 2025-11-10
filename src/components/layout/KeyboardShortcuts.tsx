import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onFocusSearch: () => void;
  onOpenGovernance: () => void;
  onOpenAgents: () => void;
  onOpenConnectors: () => void;
  onOpenCommandPalette: () => void;
}

export const KeyboardShortcuts = ({
  onFocusSearch,
  onOpenGovernance,
  onOpenAgents,
  onOpenConnectors,
  onOpenCommandPalette,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
        if (!isTyping) {
          event.preventDefault();
          onFocusSearch();
        }
        return;
      }

      if (event.key.toLowerCase() === 'g' && !isTyping) {
        event.preventDefault();
        onOpenGovernance();
        return;
      }

      if (event.key.toLowerCase() === 'a' && !isTyping) {
        event.preventDefault();
        onOpenAgents();
        return;
      }

      if (event.key.toLowerCase() === 'c' && !isTyping) {
        event.preventDefault();
        onOpenConnectors();
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenCommandPalette();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onFocusSearch, onOpenGovernance, onOpenAgents, onOpenConnectors, onOpenCommandPalette]);

  return null;
};
