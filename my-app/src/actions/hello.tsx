'use server'

export async function sayHello(message: string){
    console.log("Invoking say Hello, " + message);
    // return "Hello, " + message;
    return (
        <div style={{color: 'blue', fontSize: '20px'}}>
            <h4>Hello, {message}</h4>
        </div>
    );
}