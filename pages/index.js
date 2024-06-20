import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import Image from 'next/image'
import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoMail
} from 'react-icons/io5'
import { BioDescription, BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Paragraph from '../components/paragraph'
import Section from '../components/section'

import AWS from '/public/images/aws.jpeg'
import AWSPro from '/public/images/aws-pro.png'
import CKA from '/public/images/linux.png'

const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello,
        <br />
        I&apos;m a Full-Stack Developer and DevOps Engineer Based in Mongolia
        🇲🇳, Specializing in Crafting Innovative Digital Solutions
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Darkhanbayar Erdenebat
          </Heading>
          <p>Cloud Engineer ( Architect / Developer / DevOps )</p>
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
            <Image
              src="/images/darkhanbayar.jpeg"
              alt="Profile image"
              width="100"
              height="100"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          Based in Ulaanbaatar, Darkhanbayar is a passionate full-stack
          developer dedicated to creating innovative digital solutions. With a
          keen interest in every aspect of product development, he excels in
          planning, designing, and coding to solve real-world problems
          efficiently.
        </Paragraph>
        {/* <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/works"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            My portfolio
          </Button>
        </Box> */}
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
          <Link
            href="https://fibo.global/"
            target="_blank"
            style={{ textDecoration: 'underline' }}
          >
            FIBO CLOUD!
          </Link>
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          Certification
        </Heading>
        <Flex>
          <Image
            src={AWS}
            alt={'aws'}
            width={40}
            height={40}
            style={{ width: 40, height: 40 }}
          />
          <Center ml="10px">
            <Flex direction="column">
              AWS Certified Developer - Associate - Amazon Web Services (AWS)
              <BioDescription>
                Issued May 2020 – Expires Apr 2023
              </BioDescription>
            </Flex>
          </Center>
        </Flex>
        <Flex mt="15">
          <Image
            src={CKA}
            alt={'linux'}
            width={40}
            height={40}
            style={{ width: 40, height: 40 }}
          />
          <Center ml="10px">
            <Flex direction="column">
              CKA: Certified Kubernetes Administrator - The Linux Foundation
              <BioDescription>
                Issued Mar 2022 – Expires Mar 2025
              </BioDescription>
            </Flex>
          </Center>
        </Flex>
        <Flex mt="15">
          <Image
            src={AWSPro}
            alt={'AWSPro'}
            width={40}
            height={40}
            style={{ width: 40, height: 40 }}
          />
          <Center ml="10px">
            <Flex direction="column">
              AWS Certified Solutions Architect - Professional
              <BioDescription>Soon ...</BioDescription>
            </Flex>
          </Center>
        </Flex>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Gaming, Music, DevOps Engineering,{' '}
          <a
            href="https://www.instagram.com/chimegbolorr/"
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
          Contact
        </Heading>
        <List>
          <ListItem>
            <a href="mailto:darkhanbayarr@gmail.com">
              <Button variant="ghost" colorScheme="teal" leftIcon={<IoMail />}>
                darkhanbayarr@gmail.com
              </Button>
            </a>
          </ListItem>
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
