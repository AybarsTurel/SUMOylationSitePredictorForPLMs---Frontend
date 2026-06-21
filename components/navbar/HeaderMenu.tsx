'use client';

import { Menu, Group, Center, Burger, Container, Anchor, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';
import { useState } from 'react';

const links = [
  {
    label: 'Predict',
    links: [
      { link: '/uniprot-id', label: 'Predict with Uniprot ID' },
      { link: '/protein-sequence', label: 'Predict with Protein Sequence' },
      { link: '/fasta-file', label: 'Predict with Fasta File' }
    ],
  },
  { 
    label: 'Tutorial',
    links: [
      { link: '/beginner-tutorial', label: 'Website Tutorial' },
      { link: '/advanced-tutorial', label: 'Package Tutorial' }
    ]
  },
  { link: '/uniprot-id-explain', label: "Interpretability Tool"},
  { link: '/about', label: 'About' },
];

export function HeaderMenu() {
  const [opened, setOpened] = useState(false);
  
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <a href={item.link} key={item.link} className={classes.noUnderline}>
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
      </a>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              key={link.label}
              href={link.link}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        
        {/* LOGO VE METİN ALANI */}
        <Anchor 
          href='/uniprot-id'
          underline='never'
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
          }}
        >
          {/* BİYOTEKNOLOJİ & YAPAY ZEKA TEMALI LOGO İKONU */}
          <svg 
            width="34" 
            height="34" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <path d="M6 16C10 6 14 6 18 16C22 26 26 26 30 16" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M2 16C6 26 10 26 14 16C18 6 22 6 26 16" stroke="#9bc5ff" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" opacity="0.7"/>
            <circle cx="6" cy="16" r="3.5" fill="#228be6" stroke="white" strokeWidth="1.5" />
            <circle cx="14" cy="16" r="4.5" fill="url(#logo-grad)" stroke="white" strokeWidth="2" />
            <circle cx="22" cy="16" r="3.5" fill="#15aabf" stroke="white" strokeWidth="1.5" />
            <defs>
              <linearGradient id="logo-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#228be6" />
                <stop offset="100%" stopColor="#15aabf" />
              </linearGradient>
            </defs>
          </svg>

          {/* LOGO METNİ */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 850,
                letterSpacing: '-0.75px',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              <span style={{ color: '#1a1b1e' }}>SUMO</span>
              <span
                style={{
                  background: 'linear-gradient(45deg, #228be6 0%, #15aabf 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                -ESM
              </span>
            </div>
            <span 
              style={{ 
                fontSize: '9px', 
                fontWeight: 600, 
                letterSpacing: '1px', 
                color: '#868e96',
                fontFamily: 'Roboto Mono, monospace',
                textTransform: 'uppercase',
                marginTop: '1px'
              }}
            >
              Prediction Platform
            </span>
          </div>
        </Anchor>

        <Group gap={15} visibleFrom="xs">
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={() => {
            setOpened(!opened);
          }}
          hiddenFrom="xs"
          size="sm"
        >
          <Transition
            mounted={opened}
            transition="scale-x"
            duration={400}
            timingFunction="ease"
          >
            {styles => (
              <Group style={styles} className={classes.navList}>
                {items}
              </Group>
            )}
          </Transition>
        </Burger>
      </Container>
    </header>
  );
}

export default HeaderMenu;