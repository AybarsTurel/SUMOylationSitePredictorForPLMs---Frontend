"use client";

// @ts-ignore
import "@mantine/core/styles.css";
import React from "react";
import { 
  Container, 
  Text, 
  Image, 
  Title, 
  Card, 
  Grid, 
  Badge, 
  Stack, 
  Group, 
  ThemeIcon 
} from "@mantine/core";

export default function BeginnerTutorialPage() {
  return (
    <Container size="md" py="xl">
      {/* Ana Başlık Alanı */}
      <Stack align="center" mb="xl" gap="xs">
        <Badge variant="filled" size="lg" radius="sm" color="blue">
          Documentation
        </Badge>
        <Title order={1} size="h2" style={{ textAlign: "center" }}>
          How to Use SUMO-ESM?
        </Title>
        <Text c="dimmed" size="lg" style={{ textAlign: "center", maxWidth: 600 }}>
          You can submit your data to the platform in three different ways: 
          Using UniProt IDs, entering raw Protein Sequences, or uploading a FASTA/TXT file.
        </Text>
      </Stack>

      <Stack gap="xl">
        {/* BÖLÜM 1: UniProtID */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="blue" size="xl" radius="xl">1</ThemeIcon>
            <Title order={2} size="h3">Predict via UniProt ID</Title>
          </Group>
          
          <Text mb="md">
            To make predictions using a UniProt accession number, select the 
            <strong> Predict with UniProt ID</strong> option from the dropdown menu. You will be greeted by the following interface:
          </Text>

          <Card.Section p="md" bg="var(--mantine-color-gray-0)">
            <Image 
              src="/uniProtIDPrediction.png"
              alt="UniProt ID Prediction Interface"   
              radius="md"
              fit="contain"
              h={300}
            />
          </Card.Section>

          <Text mt="md" mb="xl">
            Providing a UniProt ID is required, while specifying a Lysine Position is optional. Additionally, you can adjust the prediction threshold to filter and display only the results that meet your desired confidence level.
          </Text>

          {/* Alt Başlıklar / Varyasyonlar */}
          <Stack gap="lg">
            <Card variant="dashed" padding="md" radius="md" withBorder>
              <Title order={3} size="h4" mb="xs" c="blue">1.1) Prediction Without a Specific Lysine Position</Title>
              <Text mb="md">If you do not provide a specific Lysine position, the system will evaluate and display results for all candidate Lysine positions across the sequence:</Text>
              <Image src="/exampleOutput1.png" alt="Output for all Lysine positions" radius="md" fit="contain" h={400} />
            </Card>

            <Card variant="dashed" padding="md" radius="md" withBorder>
              <Title order={3} size="h4" mb="xs" c="blue">1.2) Batch Prediction with Multiple UniProt IDs</Title>
              <Text mb="md">You can also query multiple UniProt IDs simultaneously by separating them. Here is an example of a multi-query submission:</Text>
              
              <Grid gutter="md" align="center">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Image src="/UniprotIdMulti.png" alt="Multiple UniProt ID Input" radius="md" fit="contain" h={250} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Image src="/UniprotIdMulti2.jpeg" alt="Multiple UniProt ID Input Detail" radius="md" fit="contain" h={250} />
                </Grid.Col>
              </Grid>
              
              <Text mt="md" mb="xs" size="sm" c="dimmed">The combined prediction results for all specified proteins will be generated as follows:</Text>
              <Image src="/exampleOutput1.png" alt="Batch Output Results" radius="md" fit="contain" h={400} />
            </Card>

            <Card variant="dashed" padding="md" radius="md" withBorder>
              <Title order={3} size="h4" mb="xs" c="blue">1.3) Prediction for a Targeted Lysine Position</Title>
              <Text mb="md">If you isolate the query to a specific Lysine Position, the output will restrict its analysis exclusively to that site:</Text>
              <Image src="/exampleOutput2.jpeg" alt="Output for a Specific Lysine Position" radius="md" fit="contain" h={250} />
            </Card>
          </Stack>
        </Card>

        {/* BÖLÜM 2: Protein Sequence */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="teal" size="xl" radius="xl">2</ThemeIcon>
            <Title order={2} size="h3">Predict via Protein Sequence</Title>
          </Group>

          <Text mb="md">
            The second input modality allows you to paste raw protein sequences directly. Select 
            <strong> Predict with Protein Sequence</strong> from the dropdown menu to navigate to this page:
          </Text>

          <Card.Section p="md" bg="var(--mantine-color-gray-0)" mb="md">
            <Image src="/proteinSequence.png" alt="Protein Sequence Submission Page" radius="md" fit="contain" h={300} />
          </Card.Section>

          <Text size="sm" c="dimmed" style={{ fontStyle: "italic" }}>
            * You can click the sample sequence button to quickly test the submission template or clear it to provide your own sequence.
          </Text>
        </Card>

        {/* BÖLÜM 3: FASTA */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="grape" size="xl" radius="xl">3</ThemeIcon>
            <Title order={2} size="h3">Predict via FASTA / TXT File Upload</Title>
          </Group>

          <Text mb="md">
            For high-throughput screen queries, you can upload structured <code>.fasta</code> or <code>.txt</code> files. 
            Choose <strong>Predict with Fasta File</strong> from the dropdown option menu.
          </Text>

          <Card.Section p="md" bg="var(--mantine-color-gray-0)" mb="md">
            <Image src="/FastaFile.png" alt="FASTA/TXT File Upload Page" radius="md" fit="contain" h={300} />
          </Card.Section>

          <Text size="sm" c="dimmed" style={{ fontStyle: "italic" }}>
            * A sample FASTA file is available for download to verify your format compatibility before uploading custom datasets.
          </Text>
        </Card>

        {/* YENİ BÖLÜM 4: INTERPRETABILITY TOOL */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="orange" size="xl" radius="xl">4</ThemeIcon>
            <Title order={2} size="h3">Interpretability & Model Attribution Tool</Title>
          </Group>

          <Text mb="md">
            <strong> Interpretability Tool</strong> can be used to understand whics positions important in model's decision-making.
          </Text>

          <Card.Section p="md" bg="var(--mantine-color-gray-0)" mb="md">
            <Image 
              src="/interpretabilityOutput.png" 
              alt="Interpretability Tool Analysis Result Table" 
              radius="md" 
              fit="contain" 
              h={400} 
            />
          </Card.Section>

          <Text size="sm" c="dimmed">
            This part may take 5-6 minutes to indicate result. You cn clisk to square boxes to see the specific probability change.
          </Text>
        </Card>
      </Stack>
    </Container>
  );
}