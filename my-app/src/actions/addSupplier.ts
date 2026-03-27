'use server'

import path from "path";
import fs, { stat } from "fs";
import { redirect } from "next/navigation";

export async function formSubmit(prevStatus: object, form: FormData) {
    const id = form.get("id")?.toString();
    const name = form.get("name")?.toString();
    const contactPerson = form.get("contactPerson")?.toString();
    const email = form.get("email")?.toString();
    const location = form.get("location")?.toString();

    const supplier : Supplier = {
        id: Number(id),
        name: name || "",
        contactPerson: contactPerson || "",
        email: email || "",
        location: location || ""
    };

    if(supplier.id<100){
        return {status: -1, message: "error"};
    }

    const filepath = path.join(process.cwd(), "data", "suppliers.json");
    const suppliers = JSON.parse(fs.readFileSync(filepath, "utf-8")) as Supplier[];
    suppliers.push(supplier);

    await fs.writeFileSync(filepath, JSON.stringify(suppliers));

    console.log("Added supplier", supplier);

    redirect("/suppliers");

    return {status: 1, message: "Supplier added successfully"};

}