
export const ServerSkeleton = () => {

    return (
        <div className="bg-slate-200 dark:bg-background p-4 rounded-lg shadow-md border border-slate-300 dark:border-slate-700 transition-colors animate-pulse">
            {/* Encabezado con icono y nombre */}
            <div className="flex items-center mb-3 relative">
              <div className="h-8 w-8 rounded-full bg-slate-300 dark:bg-slate-600" />
              <div className="ml-2 h-4 w-32 bg-slate-300 dark:bg-slate-600 rounded" />
            </div>
        
            {/* Datos del servidor en grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded" />
            </div>
        </div>
    );
}  