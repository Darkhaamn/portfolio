/* eslint-disable react/no-unescaped-entities */
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
  <Layout title="MedTech Partner LLC">
    <Container>
      <Title>
        MedTech Partner LLC <Badge>2021–Present</Badge>
      </Title>
      <Center my={6}>
        <Image src="/images/works/medtech.svg" alt="MedTech Partner LLC logo" />
      </Center>
      <P>
        At <b>MedTech Partner LLC</b>, I take pride in my contributions to the
        pharmaceutical industry. I’ve developed innovative solutions to enhance
        medical supply management and streamline operations, leading to
        significant improvements in efficiency and sales.
      </P>
      <P>
        The MedOrder ecosystem consists of three main web platforms: the main
        customer-facing site, an <b>Admin Portal</b> (
        <Link href="https://admin.mrp.mn" isExternal>
          admin.mrp.mn <ExternalLinkIcon mx="2px" />
        </Link>
        ), and a <b>Supplier Portal</b> (
        <Link href="https://supplier.mrp.mn" isExternal>
          supplier.mrp.mn <ExternalLinkIcon mx="2px" />
        </Link>
        ).
      </P>
      <UnorderedList ml={4} my={4}>
        <ListItem>
          <b>Admin Portal:</b> The admin website allows administrators to
          control the entire platform, including managing all suppliers,
          products, and marketing activities. Admins have full oversight and can
          coordinate operations, monitor performance, and launch marketing
          campaigns across the ecosystem.
        </ListItem>
        <ListItem>
          <b>Supplier Portal:</b> Each supplier has access to their own
          dedicated portal, where they can manage their products, process and
          track orders, and run their own marketing initiatives. This empowers
          suppliers to independently handle their business while staying
          integrated with the main platform.
        </ListItem>
        <ListItem>
          <b>Real-time Order Tracking System:</b> We have developed a
          state-of-the-art order tracking system that enables easy monitoring of
          medical supply orders. With real-time updates and notifications, you
          can efficiently track the progress of your orders and ensure timely
          delivery.
        </ListItem>
        <ListItem>
          <b>Scalable Microservice Architecture:</b> We utilize a scalable
          microservice architecture that provides flexible and reliable system
          functionality. This modular approach allows for easy scaling, rapid
          deployment, and fault tolerance, ensuring uninterrupted operations.
        </ListItem>
        <ListItem>
          <b>Connection to License Management API:</b> We connect our systems to
          the License Management API for regulatory compliance and proper record
          keeping. This integration simplifies the process of managing licenses
          and ensures adherence to regulatory requirements.
        </ListItem>
        <ListItem>
          <b>40,123+ Orders Processed:</b> My system has managed over 40,123
          orders, ensuring accurate and timely delivery of medical supplies to
          customers.
        </ListItem>
      </UnorderedList>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            React, TypeScript, Golang, PostgreSQL, Redis, Docker, Kubernetes,
            Microservices, REST API, IOT, License Management API integration
          </span>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://mrp.mn" isExternal>
            https://mrp.mn <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Admin Portal</Meta>
          <Link href="https://admin.mrp.mn" isExternal>
            https://admin.mrp.mn <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Supplier Portal</Meta>
          <Link href="https://supplier.mrp.mn" isExternal>
            https://supplier.mrp.mn <ExternalLinkIcon mx="2px" />
          </Link>
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
          <Link href="https://mrp.mn" isExternal>
            <Badge mr={2}>mrp.mn</Badge>
            MedTech Partner LLC Official Website <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://admin.mrp.mn" isExternal>
            <Badge mr={2}>admin.mrp.mn</Badge>
            Admin Portal <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://supplier.mrp.mn" isExternal>
            <Badge mr={2}>supplier.mrp.mn</Badge>
            Supplier Portal <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </UnorderedList>

      <WorkImage
        src="/images/works/medtech.png"
        alt="MedTech Partner LLC Dashboard"
      />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
