export const revalidate = 60;
//'use client';
// import { useTitle } from "@/hooks/useTitle";

export default async function About() {
        // useEffect(() => {
        //     document.title = document.title + `About Page`;
        // }, []);
    // useTitle("About Page");
    console.log("rendering about page ...");

    await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
        <div>
            <h1>About</h1>
            <p>This is the about page.</p>
        </div>
    );
}


// export const dynamic = "force-dynamic";