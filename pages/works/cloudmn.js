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
  <Layout title="Cloud.mn">
    <Container>
      <Title>
        Cloud.mn <Badge>2019–Present</Badge>
      </Title>
      <Center my={6}>
        <Image src="/images/works/cloudmn.svg" alt="Cloud.mn logo" />
      </Center>
      <P>
        <b>Cloud.mn</b> is Mongolia&apos;s first public cloud service, enabling
        users to register and create virtual machines, disks, networks, and
        other resources as needed—essentially a smaller-scale AWS for Mongolia.
      </P>
      <P>
        The project’s goal was to establish a public cloud service in Mongolia,
        where none existed previously. Our company developed the first solution,
        and I was directly involved from the start, contributing to the
        frontend, backend, DevOps, and integrations.
      </P>
      <P>
        We already include Mongolia&apos;s top +3000 companies among our
        customers, demonstrating the platform&apos;s reliability and trust
        within the local business community.
      </P>
      <UnorderedList ml={4} my={4}>
        <ListItem>
          Users can provision and manage virtual machines, storage disks, and
          private networks via a self-service portal.
        </ListItem>
        <ListItem>
          Built-in billing, user management, and resource monitoring.
        </ListItem>
        <ListItem>API and dashboard for automation and integration.</ListItem>
        <ListItem>Localized for Mongolian users and infrastructure.</ListItem>
        <ListItem>
          First public cloud platform in Mongolia, supporting local businesses
          and developers.
        </ListItem>
        <ListItem>
          I contributed across the stack: frontend (React), backend (Python,
          Go), DevOps (KVM, OpenStack, Ansible), and integrations (payment, SMS,
          monitoring).
        </ListItem>
      </UnorderedList>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            React, TypeScript, Python, Go, OpenStack, Docker, Kubernetes,
            MariaDB, Redis, RabbitMQ, Nginx, AWS
          </span>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://cloud.mn" isExternal>
            https://cloud.mn <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Launched</Meta>
          <span>2019</span>
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
          <Link href="https://cloud.mn" isExternal>
            <Badge mr={2}>cloud.mn</Badge>
            Official website <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        {/* Add more media links here if available */}
      </UnorderedList>

      <WorkImage
        src="/images/works/cloudmn.png"
        alt="Cloud.mn network management"
      />
      <WorkImage src="/images/works/cloudmn-2.png" alt="Cloud.mn billing" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
