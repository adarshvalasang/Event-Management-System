import React, { useState } from 'react';
import api from '../api/api';

const ApiTest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    try {
      const response = await api.get('/events');
      setResult(JSON.stringify(response.data, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setResult('');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="mb-2 text-xl font-bold">API Test</h2>
      <button
        onClick={testApi}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Test API Connection
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
      {result && (
        <pre className="p-4 mt-2 overflow-auto bg-gray-100 rounded">
          {result}
        </pre>
      )}
    </div>
  );
};

export default ApiTest;

