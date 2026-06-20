'use client'

import React, { useState } from 'react';
import {
  Button,
  Container,
  Title,
  Text,
  Flex,
  Loader,
  TextInput,
  Space,
  Alert,
  Slider,
  Paper,
  SegmentedControl
} from '@mantine/core';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Plotly'i sadece client tarafında yüklenecek şekilde dinamik import ediyoruz
// @ts-ignore
const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => <Loader size="md" />
});

import { TableSort } from '../table/TableSort';
const AA = "ACDEFGHIKLMNPQRSTVWY".split("");

function Explain() {

  const [uniProtID, setUniProtID] = useState('');
  const [lysine, setLysine] = useState('');

  const [data, setData] = useState<any>(null);
  const [mode, setMode] = useState("dP");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showError, setShowError] = useState(false);

  const handleLoadSampleUniprot = () => {
    setUniProtID('O00566');
  };

    const handleLoadSampleLysine = () => {
    setLysine("20");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setShowError(false);
    setData(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/uniprot-prediction-explainability/",
        {
          uniprot_id: uniProtID,
          lysine_position: parseInt(lysine, 10)
        }
      );

      setData(response.data);

    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || "An error occurred.");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* ===========================
     MATRIX SELECTION
  =========================== */

  const rawMatrix =
    data && (mode === "dP"
      ? data.explainability_matrix[0]
      : data.explainability_matrix[1]);

  const matrix =
    rawMatrix?.[0]?.map((_: any, colIndex: number) =>
      rawMatrix.map((row: any) => row[colIndex])
    );

  /* ===========================
     21-MER WINDOW FIX
  =========================== */

  const fullSequence = data?.data || "";

  const sequence =
    fullSequence
      ? fullSequence.slice(54, 75)
      : "";

  const positionLabels =
    sequence.split("").map(
      (res: string, i: number) => `${1 + i}-${res}`
    );

  return (
    <Container size="lg">

      <Flex justify="space-between">

        {/* LEFT SIDE (FORM) */}
        <Flex direction="column" style={{ width: '50%', paddingRight: '40px' }}>
          <form onSubmit={handleSubmit}>

            <Title order={1} size="h1" style={{ marginBottom: '20px' }}>
              Explainability Tool
            </Title>

            <Flex justify="space-between" align="center" style={{ marginBottom: '20px' }}>
              <TextInput
                variant="filled"
                size="md"
                radius="lg"
                withAsterisk
                description="Please enter UniProtID."
                label="Uniprot ID"
                placeholder="O00566"
                value={uniProtID}
                onChange={(e) => setUniProtID(e.currentTarget.value)}
                style={{ width: '75%' }}
              />
              <div style={{ textAlign: 'right', paddingTop:'42px' }}>
                            <Text component="a" style={{ cursor: 'pointer', color: 'blue'}} onClick={handleLoadSampleUniprot}>
                              Load Sample
                            </Text>
                          </div>
            </Flex>

            <Flex justify="space-between" align="center" style={{ marginBottom: '20px' }}>
              <TextInput
                variant="filled"
                size="md"
                radius="lg"
                withAsterisk
                label="Lysine Position"
                placeholder="20"
                value={lysine}
                onChange={(e) => setLysine(e.currentTarget.value)}
                style={{ width: '75%' }}
              />
              <div style={{ textAlign: 'right',paddingTop:'42px' }}>
                            <Text component="a" style={{ cursor: 'pointer', color: 'blue'}} onClick={handleLoadSampleLysine}>
                              Load Sample
                            </Text>
                          </div>
            </Flex>

            <Space h="sm" />

            <Button
              type="submit"
              size="lg"
              style={{ width: '50%' }}
              radius="md"
              variant="gradient"
              color="blue"
            >
              {isLoading ? <Loader color="white" size={24} /> : 'Explain'}
            </Button>

          </form>
        </Flex>

        {/* RIGHT SIDE INFO TEXT */}
        <Flex direction="column" justify="center" style={{ width: '50%', paddingLeft: '40px' }}>
          <p>
            You can enter a UniProt ID and a lysine position for that protein. The specified lysine position must correspond to a lysine (K) residue in the full protein sequence.
          </p>
          <p>
            Our tool extracts a 21-amino-acid window centered on the selected lysine residue. Then, each position in this sequence is systematically mutated to all possible amino acids and re-evaluated by the prediction model.
          </p>
          <p>
            The resulting heatmap shows the change in prediction probability for each possible mutation at each position. This allows you to observe which positions in the sequence the model considers most influential for its prediction, providing insight into the model’s attention and decision-making process.
          </p>
        </Flex>

      </Flex>

      <Space h="xl" />

      {showError && (
        <Alert color="red" withCloseButton onClose={() => setShowError(false)}>
          {errorMsg}
        </Alert>
      )}

      <Space h="xl" />

      {/* ================= HEATMAP ================= */}

      {data && matrix && (
        <Paper p="md" shadow="sm" radius="md">

          <SegmentedControl
            value={mode}
            onChange={setMode}
            data={[
              { label: "ΔP", value: "dP" },
              { label: "ΔLOG", value: "dLOG" }
            ]}
            mb="md"
          />

          <Plot
            data={[
              {
                z: matrix,
                x: positionLabels,
                y: AA,
                type: "heatmap",
                colorscale: "RdBu",
                zmid: 0
              }
            ]}
            layout={{
              autosize: true,
              height: 600,
              title:
                mode === "dP"
                  ? "Mutation Impact Heatmap (ΔP)"
                  : "Mutation Impact Heatmap (ΔLOG)",

              xaxis: {
                title: "Sequence Position",
                tickangle: -90
              },

              yaxis: {
                title: "Mutated Amino Acid"
              },

              shapes: [
                {
                  type: "rect",
                  x0: 10 - 0.5,
                  x1: 10 + 0.5,
                  y0: -0.5,
                  y1: 19.5,
                  fillcolor: "black",
                  opacity: 0.35,
                  line: { width: 0 }
                }
              ]
            }}
            config={{
              responsive: true,
              displaylogo: false
            }}
          />
          <Text fw={600} mb="xs">
            Sequence Interpreted:
          </Text>



          <Text mb="md" style={{ fontFamily: "monospace" }}>
            {sequence.split("").map((aa: string, i: number) => (
            <span
              key={i}
              style={
                i === 10
                  ? {
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "darkblue"
                    }
                  : {}
              }
            >
              {aa}
            </span>
          ))}
          </Text>
            <Space h="xl" />
        </Paper>
      )}

      <Space h="xl" />
 {data?.results && (
  <Paper p="md" shadow="sm" radius="md">
    <Title order={3} mb="md">
      Prediction Results
    </Title>
    <TableSort predictions={data.results} />
  </Paper>
)}
    </Container>
  );
}

export default Explain;