'use client';
import React, { useState, useEffect, createRef } from 'react';
import { Product } from '../../models/Product';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../utils/firestore';
import { Modal, Button, Table, Form, Input, Spin, Image, FormInstance } from 'antd'; // Importing Spin for loading indicator
import './style.css';

const DashboardPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [addingProduct, setAddingProduct] = useState(false);
    const formRef = createRef<FormInstance>();

useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        const loadedProducts = await getProducts();
        setProducts(loadedProducts);
        setLoading(false);
    };
    fetchProducts();
}, []);

const showModal = (product?: Product) => {
    setCurrentProduct(product || null);
    setIsModalVisible(true);
};

const handleOk = async (values: Product) => {
    setAddingProduct(true);
    try {
        if (currentProduct) {
            await updateProduct(currentProduct.id, values);
            setProducts(prev => prev.map(product => 
                product.id === currentProduct.id ? {...product, ...values} as Product : product
            ));
        } else {
            await addProduct(values);
            setProducts(prev => [...prev, values]);
        }
    } catch (error) {
        console.error("Failed to add/update the product", error);
    }
    setIsModalVisible(false);
    setCurrentProduct(null);
    setAddingProduct(false);
    formRef.current?.resetFields();
};


const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentProduct(null);
};

const handleDelete = async (id: string) => {
    setLoading(true);
    try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
        console.error("Failed to delete the product", error);
    }
    setLoading(false);
};


    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Details', dataIndex: 'details', key: 'details' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <Image
                    width={50}
                    height={50}
                    src={image}
                    style={{ borderRadius: '50%' }}
                    alt="Product"
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Product) => (
                <>
                    <Button onClick={() => showModal(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <h2>Products</h2>
                <Button type="primary" onClick={() => showModal()}>Add Product</Button>
            </div>

            {loading ? <Spin size="large" /> : <Table dataSource={products} columns={columns} rowKey="id" className='table' />}

            <Modal title={currentProduct ? "Edit Product" : "Add Product"} visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form onFinish={handleOk} initialValues={currentProduct || { name: '', details: '', image: '' }} ref={formRef}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="details" label="Details" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {addingProduct ? <Spin /> : currentProduct ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DashboardPage;
