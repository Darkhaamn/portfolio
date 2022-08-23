import {
  Box,
  Button,
  chakra,
  Container,
  Heading,
  Link,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import Image from 'next/image'
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5'
import { BioSection, BioYear, BioDescription } from '../components/bio'
import Layout from '../components/layouts/article'
import Paragraph from '../components/paragraph'
import Section from '../components/section'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      >
        Hello, I&apos;m a full-stack developer based in Ulaanbaatar!
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Darkhanbayar Erdenebat
          </Heading>
          <p>Cloud Engineer ( Architect / Developer )</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/darkhanbayar.jpeg"
              alt="Profile image"
              borderRadius="full"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          Darkhanbayar is full-stack developer based at Ulaanbaatar with a
          passion for building digital services/stuff he wants. He has
          interested in all things launching products, from planning and
          designing all the way to solving real-life problems with code.
        </Paragraph>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>1997</BioYear>
          Born in Darkhan, Mongolia.
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear>
          Completed the Bachelor&apos;s Program in the Graduate School of
          Information Technology at Mongolia University Science and Technology
        </BioSection>
        <BioSection>
          <BioYear>2019 to present</BioYear>
          Worked at{' '}
          <Link href="https://fibo.cloud/" target="_blank">
            FIBO CLOUD!
          </Link>
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          Certification
        </Heading>
        <BioSection>
          <BioYear>
            <Image
              src={require('/public/images/aws.jpeg')}
              alt={'aws'}
              width={35}
              height={35}
            />
          </BioYear>
          AWS Certified Developer - Associate - Amazon Web Services (AWS)
          <BioDescription>Issued May 2020 – Expires Apr 2023</BioDescription>
        </BioSection>
        <BioSection>
          <BioYear>
            <Image
              src={require('/public/images/linux.png')}
              alt={'linux'}
              width={35}
              height={35}
            />
          </BioYear>
          CKA: Certified Kubernetes Administrator - The Linux Foundation
          <BioDescription>Issued Mar 2022 – Expires Mar 2025</BioDescription>
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Gaming, Music, DevOps Engineering,{' '}
          <a
            href="https://www.instagram.com/bolorchimeg0419/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            Booloi
          </a>
        </Paragraph>
      </Section>

      <Section delay={0.4}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/darkhaamn" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @darkhaamn
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://instagram.com/darhanbayr" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoInstagram />}
              >
                @darhanbayr
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.linkedin.com/in/darkhanbayar-erdenebat-338a6b182/"
              target="_blank"
            >
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoLinkedin />}
              >
                Darkhanbayar Erdenebat
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
