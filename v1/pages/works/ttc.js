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
  <Layout title="TTC Cloud">
    <Container>
      <Title>
        TTC Cloud <Badge>2022–Present</Badge>
      </Title>
      <Center my={6}>
        <Image src="/images/works/ttc.svg" alt="TTC Cloud logo" />
      </Center>
      <P>
        <b>TTC Cloud</b> is the public cloud platform of Kazakhstan’s largest
        data center,{' '}
        <a
          href="https://ttc.kz"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue.500', textDecoration: 'underline' }}
        >
          Transtelecom (TTC)
        </a>
        . I contributed to the development of this platform, which offers a
        broad suite of cloud services for businesses and developers across
        Kazakhstan.
      </P>
      <P>
        Unlike Mongolia’s cloud, TTC Cloud was designed to support a wider range
        of services and integrate deeply with local payment gateways and
        financial systems. My work spanned frontend, backend, DevOps, and
        integration with Kazakhstan’s unique infrastructure and compliance
        requirements.
      </P>
      <P>
        The platform serves a diverse set of enterprise clients, providing
        scalable compute, storage, and networking, as well as advanced features
        tailored for the Kazakhstani market.
      </P>
      <UnorderedList ml={4} my={4}>
        <ListItem>
          Self-service portal for provisioning and managing virtual machines,
          block storage, and private networks.
        </ListItem>
        <ListItem>
          Integration with local payment systems and financial reporting tools.
        </ListItem>
        <ListItem>
          Advanced monitoring, user management, and automated billing.
        </ListItem>
        <ListItem>
          API and dashboard for automation, orchestration, and third-party
          integrations.
        </ListItem>
        <ListItem>
          Localized for Kazakh and Russian users, with compliance to regional
          data regulations.
        </ListItem>
        <ListItem>
          My contributions included frontend (React), backend (Python, Go),
          DevOps (OpenStack, KVM, Ansible), and integrations (payment,
          monitoring, security).
        </ListItem>
      </UnorderedList>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            React, TypeScript, Python, Go, OpenStack, Docker, Kubernetes,
            MariaDB, Redis, RabbitMQ, Nginx, Local Payment APIs
          </span>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://cloud.ttc.kz/" isExternal>
            https://cloud.ttc.kz <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Launched</Meta>
          <span>2021</span>
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
          <Link href="https://cloud.ttc.kz/" isExternal>
            <Badge mr={2}>cloud.ttc.kz</Badge>
            Official website <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        {/* Add more media links here if available */}
      </UnorderedList>

      <WorkImage src="/images/works/ttc.png" alt="TTC Cloud dashboard" />
      <WorkImage src="/images/works/ttc-1.jpeg" alt="TTC Cloud " />
      <WorkImage src="/images/works/ttc-2.jpeg" alt="TTC Cloud " />
      <WorkImage src="/images/works/ttc-3.jpeg" alt="TTC Cloud " />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
