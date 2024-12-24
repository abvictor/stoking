import { db } from "@/app/_lib/prisma";

export async function GET(request: Request,
     { params }: { params: {id: number}},
    ){

    const productId = params.id;
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })

    if(!product){
        return Response.json(
            { message: "Produto não encontrado" },
            { status: 404 }
    )}

    return Response.json(product, {status: 200})
}

export async function DELETE(request: Request,
     { params }: { params: {id: number}},
    ){
         await db.product.delete({
           where: {
             id: params.id,
           },
         });

         return Response.json({ status: 204 });
    }