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
  ThemeIcon,
  Divider,
  Anchor,
  SimpleGrid
} from "@mantine/core";
import { IconInfoCircle, IconChartBar, IconAlertTriangle, IconQuote, IconUsers } from "@tabler/icons-react";

export default function AboutPage() {
  return (
    <Container size="md" py="xl">
      {/* Üst Karşılama Alanı */}
      <Stack align="center" mb="xl" gap="xs">
        <Badge variant="dot" size="lg" color="blue">
          About the Project
        </Badge>
        <Title order={1} size="h1" style={{ textAlign: "center", letterSpacing: "-0.5px" }}>
          What is SUMO-ESM?
        </Title>
      </Stack>

      <Stack gap="xl">
        {/* PROJE TANIMI VE GİRİŞ */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="blue" size="xl" radius="md">
              <IconInfoCircle size="1.2rem" />
            </ThemeIcon>
            <Title order={2} size="h3">Overview</Title>
          </Group>
          
          <Text mb="md" style={{ lineHeight: 1.6 }}>
            The <strong>SUMO-ESM</strong> project aims to improve the user experience, user interface, and overall performance of a web application dedicated to predicting potential SUMOylation sites, which are highly implicated in genetic-based diseases such as Alzheimer's, cancer, and diabetes. 
          </Text>
          
          <Text mb="md" style={{ lineHeight: 1.6 }}>
            The underlying <strong>ESM-2</strong> transformer model is fine-tuned with a customized dataset enriched by robust data augmentation techniques. The platform processes three distinct input types: UniProt IDs (with optional target Lysine positions and customizable confidence thresholds), raw protein sequences, and high-throughput FASTA files.
          </Text>

          <Text mb="xl" style={{ lineHeight: 1.6 }}>
            Upon analyzing the submissions through the transformer framework, SUMO-ESM maps out comprehensive parameters including Protein ID, Protein Name, Lysine Position, Peptide Sequence, Sumoylation Probability, and final categorical predictions.
          </Text>

          <Card.Section p="md" bg="var(--mantine-color-gray-0)">
            <Stack align="center" gap="xs">
              <Image 
                src="/exampleOutput1.png"
                alt="SUMO-ESM Output Interface Example"   
                radius="md"
                fit="contain"
                maxWidth="100%"
                h={350}
              />
              <Text size="xs" c="dimmed" style={{ fontStyle: "italic" }}>
                Figure 1: Example Prediction Output Matrix of SUMO-ESM
              </Text>
            </Stack>
          </Card.Section>
        </Card>

        {/* PERFORMANS DEĞERLENDİRMELERİ (İKİ GRAFİKLİ ALAN) */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="teal" size="xl" radius="md">
              <IconChartBar size="1.2rem" />
            </ThemeIcon>
            <Title order={2} size="h3">Model Benchmarks & Performance</Title>
          </Group>
          
          <Text mb="xl" style={{ lineHeight: 1.6 }}>
            The ESM-2 models fine-tuned with the <code>ESM2_SUMO-21-Matched-Extended128-ClusterHR</code> dataset significantly outperform existing tools in the literature and traditional machine learning baselines. Our model demonstrated a <strong>9.8% increase in AUC</strong> and an <strong>18.8% increase in AUPR</strong> over the previous leading framework, SUMOnet-3. Furthermore, our transformer-based approach dominated classical machine learning alternatives (such as XGBoost), yielding an 8.9% increase in AUC and 15.5% in AUPR. These results strongly suggest that transformer architectures excel at processing global sequence context across entire proteins.
          </Text>

          <Card.Section p="md" bg="var(--mantine-color-gray-0)">
            <Stack align="center" gap="md">
              
              {/* Grafiklerin yan yana dizilmesi için Grid yapısı */}
              <Grid gutter="md" justify="center" style={{ width: "100%" }}>
                
                {/* 1. Grafik: ROC Eğrisi */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack align="center" gap="xs">
                    <Image 
                      src="/roc_exper.png" /* Kendi ROC grafiğinin dosya adıyla değiştirebilirsin */
                      alt="ROC Curve Analysis"   
                      radius="md"
                      fit="contain"
                      maxWidth="100%"
                      h={300}
                    />
                    <Text size="xs" c="dimmed" style={{ fontStyle: "italic" }}>
                      (a) ROC Curve Comparisons
                    </Text>
                  </Stack>
                </Grid.Col>

                {/* 2. Grafik: PR Eğrisi veya Bar Chart */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack align="center" gap="xs">
                    <Image 
                      src="/PR_exp.png" /* Kendi PR veya AUC grafiğinin dosya adıyla değiştirebilirsin */
                      alt="Precision-Recall Curve Analysis"   
                      radius="md"
                      fit="contain"
                      maxWidth="100%"
                      h={300}
                    />
                    <Text size="xs" c="dimmed" style={{ fontStyle: "italic" }}>
                      (b) Precision-Recall (PR) Curve
                    </Text>
                  </Stack>
                </Grid.Col>

              </Grid>

              {/* Ana Ortak Altyazı */}
              <Text size="xs" c="dimmed" style={{ fontStyle: "italic", marginTop: "10px" }}>
                Figure 2: Comprehensive Performance Benchmarks (ROC and PR Curves) against Baseline Models
              </Text>
            </Stack>
          </Card.Section>
        </Card>

        {/* ZOR SENARYOLAR (HARD CASE) */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="orange" size="xl" radius="md">
              <IconAlertTriangle size="1.2rem" />
            </ThemeIcon>
            <Title order={2} size="h3">Performance in Non-Motif (Hard) Scenarios</Title>
          </Group>
          
          <Text mb="xl" style={{ lineHeight: 1.6 }}>
            The challenging evaluation subset isolates targets lacking traditional SUMO consensus motifs that are physically SUMOylated, alongside negative controls that exhibit valid motifs but do not undergo modification. This deep evaluation proves that our system bypasses simple linear sequence patterns, successfully mapping complex spatial features via deep architectural layers.
          </Text>

          <Card.Section p="md" bg="var(--mantine-color-gray-0)">
            <Stack align="center" gap="xs">
              <Image 
                src="/hard.png"
                alt="ROC Curve Analysis on Hard Test Sets"   
                radius="md"
                fit="contain"
                maxWidth="100%"
                h={350}
              />
              <Text size="xs" c="dimmed" style={{ fontStyle: "italic" }}>
                Figure 3: ROC Curve Dissection and Sequence Specificity Under Hard Case Trials
              </Text>
            </Stack>
          </Card.Section>
        </Card>

        {/* REFERANS / ATIF */}
        <Card shadow="sm" padding="lg" radius="md" withBorder bg="var(--mantine-color-blue-0)">
          <Group mb="xs">
            <ThemeIcon color="blue" variant="light" size="md">
              <IconQuote size="1rem" />
            </ThemeIcon>
            <Text fw={700} size="sm" c="blue.9">Citation</Text>
          </Group>
          <Text size="sm" mb="xs" c="slate.9">
            If you utilize the SUMO-ESM framework or any code dependencies in your empirical pipeline, please cite the core methodology:
          </Text>
          <Anchor 
            href="1" 
            target="_blank" 
            rel="noopener noreferrer"
            fw={600}
            size="sm"
          >
            
          </Anchor>
        </Card>

        <Divider my="sm" />

        {/* GELİŞTİRİCİ EKİP */}
        <div>
          <Group mb="md" gap="xs">
            <ThemeIcon color="gray" variant="light" size="md">
              <IconUsers size="1rem" />
            </ThemeIcon>
            <Title order={2} size="h4">Website Developers</Title>
          </Group>
          
          <SimpleGrid cols={{ base: 1, sm: 2 }} gap="md">
            <Card padding="sm" radius="sm" withBorder>
              <Text fw={600} size="sm">Alper Mert</Text>
              <Anchor href="mailto:alpermert@sabanciuniv.edu" size="xs" c="dimmed">alpermert@sabanciuniv.edu</Anchor>
            </Card>
            <Card padding="sm" radius="sm" withBorder>
              <Text fw={600} size="sm">Bülent Emin Üstün</Text>
              <Anchor href="mailto:eustun@sabanciuniv.edu" size="xs" c="dimmed">eustun@sabanciuniv.edu</Anchor>
            </Card>
            <Card padding="sm" radius="sm" withBorder>
              <Text fw={600} size="sm">Mehmet Eren Karabulut</Text>
              <Anchor href="mailto:mkarabulut@sabanciuniv.edu" size="xs" c="dimmed">mkarabulut@sabanciuniv.edu</Anchor>
            </Card>
            <Card padding="sm" radius="sm" withBorder>
              <Text fw={600} size="sm">Şevki Aybars Türel</Text>
              <Anchor href="mailto:aturel@sabanciuniv.edu" size="xs" c="dimmed">aturel@sabanciuniv.edu</Anchor>
            </Card>
          </SimpleGrid>
        </div>
      </Stack>
    </Container> 
  );
}