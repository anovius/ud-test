// utils/firebaseProduct.ts
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Product } from '../models/Product';

export const addProduct = async (product: Omit<Product, 'id'>) => {
    const docRef = await addDoc(collection(db, 'products'), product);
    return docRef.id; // returns the new product ID
};

export const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsList: Product[] = [];
    querySnapshot.forEach((doc) => {
        const docData = doc.data() as Product;
        productsList.push({
            id: doc.id,
            name: docData.name,
            details: docData.details,
            image: docData.image
        });
    });
    return productsList;
};


export const updateProduct = async (id: string, product: Product) => {
    const productRef = doc(db, 'products', id);
    const updateData = {
        name: product.name,
        details: product.details,
        image: product.image
    };
    await updateDoc(productRef, updateData);
};


export const deleteProduct = async (id: string) => {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
};
