'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Select, Button, Input, Form, Col, Row, notification, FormInstance, Skeleton } from 'antd';
import { OptionType } from '@/models/Option';
import { SubmitDocumentBody } from '@/models/ReuestBody';
import pythonService from '@/services/python.service';
const { Option } = Select;

export default function Humanization() {

  const [loading, setLoading] = useState(false);
  const [humanizedText, setHumanizedText] = useState<string>('');
  const formRef = useRef<FormInstance>(null);
  
  const readabilityOptions: OptionType[] = [
    { label: 'High School', value: 'High School' },
    { label: 'University', value: 'University' },
    { label: 'Doctorate', value: 'Doctorate' },
    { label: 'Journalist', value: 'Journalist' },
    { label: 'Marketing', value: 'Marketing' }
  ];
  
  const purposeOptions: OptionType[] = [
    { label: 'General Writing', value: 'General Writing' },
    { label: 'Essay', value: 'Essay' },
    { label: 'Article', value: 'Article' },
    { label: 'Marketing Material', value: 'Marketing Material' },
    { label: 'Story', value: 'Story' },
    { label: 'Cover Letter', value: 'Cover Letter' },
    { label: 'Report', value: 'Report' },
    { label: 'Business Material', value: 'Business Material' },
    { label: 'Legal Material', value: 'Legal Material' }
  
  ];
  
  const strengthOptions: OptionType[] = [
    { label: 'Balanced', value: 'Balanced' },
    { label: 'Quality', value: 'Quality' },
    { label: 'More Human', value: 'More Human' }
  ];
  
  const fetchResults = async (id: string) => {
    console.log('fetching results for id', id);
    try{
      let res = await pythonService.retrieveDocument(id);
      if(res.status === 'done'){
        setHumanizedText(res.output);
        setLoading(false);
      }
      else{
        setTimeout(() => {
          fetchResults(id);
        }, 30000)
      }
    }
    catch (e: any) {
      console.log(e);
      notification.error({
        message: 'An Error Occurred',
        description: `${e.response.data.status}`,
        placement: 'topRight'
      });
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {

    setLoading(true);
    const body: SubmitDocumentBody = {
      content: values.content,
      readability: values.readability,
      purpose: values.purpose,
      strength: values.strength,
    }

    try{
      let res = await pythonService.submitDocument(body);
      notification.success({
        message: 'Success',
        description: `Your document has been submitted successfully`,
        placement: 'topRight'
      });
      setTimeout(() => {
        fetchResults(res.id);
      }, 30000)
    }
    catch (e: any) {
      console.log(e);
      notification.error({
        message: 'An Error Occurred',
        description: `${e.response.data.status}`,
        placement: 'topRight'
      });
      setLoading(false);
    }
    finally {
      formRef.current?.resetFields();
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '100px' }}>
      <Form
      layout="vertical"
      onFinish={onFinish}
      ref={formRef}
      initialValues={{
        content: '',
        readability: readabilityOptions[0].value,
        purpose: purposeOptions[0].value,
        strength: strengthOptions[0].value,
      }}
    >
      <Row justify="center">
        <Col span={24}>
          <Row gutter={100} justify="center">
            <Col>
              <Form.Item name="readability" label="Readability" rules={[{ required: true}]}>
                <Select>
                  {readabilityOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="purpose" label="Purpose" rules={[{ required: true}]}>
                <Select>
                  {purposeOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="strength" label="Strength">
                <Select>
                  {strengthOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="content" label="Content" rules={[{ required: true, min: 50 , message: 'Please input at least 50 characters!' }]}>
            <Input.TextArea rows={10} placeholder='YOUR TEXT GOES HERE. PLEASE MAKE SURE IT IS AT LEAST 50 CHARACTERS LONG.' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
      {loading ? (
        <Row justify="center">
          <Col>
            <Skeleton active paragraph={{ rows: 2 }} />
            <div style={{ textAlign: 'center', margin: '20px' }}>
              Generating results...
            </div>
          </Col>
        </Row>
      ) : (
        <Row justify="center">
          {humanizedText !== ''&& <Col>
            <div style={{width: '100%' }}>
              <b>Humanized Text</b>
              <p style={{ textAlign:  'center' }}>{humanizedText}</p>
            </div>
          </Col>}
        </Row>
      )}
    </Form>
    </Row>
  );
}
