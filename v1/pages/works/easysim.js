import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Badge,
  Center,
  Container,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import P from '../../components/paragraph'
import { Meta, Title, WorkImage } from '../../components/work'

const Work = () => (
  <Layout title="EasySim.mn">
    <Container>
      <Title>
        EasySim Data Provider LLC <Badge>2025–Present</Badge>
      </Title>
      <Center my={6}>
        <Image src="/images/works/easysim.svg" alt="EasySim.mn logo" />
      </Center>
      <P>
        <b>EasySim Data Provider LLC</b> is a technology-driven company offering
        international eSIM services tailored for travelers. The core project
        involved building a digital platform that allows users to instantly
        purchase and activate eSIM data packages without the need for physical
        SIM cards. Launched inside a popular Mongolian super app, the platform
        aims to make mobile internet access more convenient, affordable, and
        accessible across 100+ countries.
      </P>
      <UnorderedList ml={4} my={4}>
        <ListItem>
          Seamless eSIM purchase and instant activation for travelers, with no
          physical SIM required.
        </ListItem>
        <ListItem>
          Integration with a major Mongolian super app for maximum reach and
          user convenience.
        </ListItem>
        <ListItem>
          Coverage in 100+ countries, with affordable data packages for
          international roaming.
        </ListItem>
        <ListItem>
          Automated QR code generation and delivery for eSIM installation.
        </ListItem>
        <ListItem>
          Secure payment integration and real-time order processing.
        </ListItem>
        <ListItem>
          User-friendly dashboard for managing purchased eSIMs and tracking
          usage.
        </ListItem>
      </UnorderedList>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            React, TypeScript, Golang, PostgreSQL, REST API, QR Code Automation,
            Payment Gateway Integration, Super App SDK
          </span>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://easysim.mn" isExternal>
            https://easysim.mn <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Launched</Meta>
          <span>2025</span>
        </ListItem>
        <ListItem>
          <Meta>Status</Meta>
          <span>Active</span>
        </ListItem>
      </List>

      <Heading as="h4" fontSize={16} my={6}>
        <Center>More Information</Center>
      </Heading>

      <UnorderedList my={4}>
        <ListItem>
          <Link href="https://easysim.mn" isExternal>
            <Badge mr={2}>easysim.mn</Badge>
            Official website <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        {/* Add more media links here if available */}
      </UnorderedList>

      <WorkImage src="/images/works/easysim.png" alt="EasySim.mn dashboard" />
      <WorkImage src="/images/works/easysim-1.png" alt="EasySim.mn dashboard" />
      {/* Add more images if available */}
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
