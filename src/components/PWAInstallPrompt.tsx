import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

export function PWAInstallPrompt() {
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }

        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
        setShowInstallPrompt(false);
    };

    return (
        <>
            {/* Update Available Notification */}
            {(offlineReady || needRefresh) && (
                <div className="fixed bottom-4 right-4 z-50 max-w-md">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {offlineReady
                                        ? 'App ready to work offline'
                                        : 'New content available, click reload to update.'}
                                </p>
                            </div>
                            <button
                                onClick={close}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        {needRefresh && (
                            <Button
                                onClick={() => updateServiceWorker(true)}
                                className="mt-3 w-full"
                                size="sm"
                            >
                                Reload
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Install App Prompt */}
            {showInstallPrompt && (
                <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-4 text-white">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Download className="h-5 w-5" />
                                    <h3 className="font-semibold">Install Zina</h3>
                                </div>
                                <p className="text-sm text-white/90">
                                    Install this app on your device for a better experience and offline access.
                                </p>
                            </div>
                            <button
                                onClick={close}
                                className="text-white/80 hover:text-white"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Button
                                onClick={handleInstall}
                                variant="secondary"
                                size="sm"
                                className="flex-1"
                            >
                                Install
                            </Button>
                            <Button
                                onClick={close}
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/20"
                            >
                                Not now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
