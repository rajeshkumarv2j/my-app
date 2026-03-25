import React from "react";

export function useTitle(title: string) {
    React.useEffect(() => {
        const originalTitle = document.title;
        document.title += " " + title;
        return () => {
            document.title = originalTitle;
        }
    }, [title]);
}