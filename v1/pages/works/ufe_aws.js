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
  <Layout title="UFE AWS Case Study">
    <Container>
      <Title>
        UFE Online Learning on AWS <Badge>2020</Badge>
      </Title>
      <Center my={6}>
        <Image src="/images/works/ufe-logo.png" alt="UFE logo" />
      </Center>
      <P>
        In late January 2020, Mongolia announced a nationwide lockdown, closing
        all educational institutions within a week. The{' '}
        <b>University of Finance and Economics (UFE)</b> faced the urgent
        challenge of maintaining uninterrupted, high-quality education for its
        students. To address this, UFE made the critical decision to migrate its
        entire online learning management system to AWS cloud infrastructure,
        ensuring accessibility and reliability for thousands of students and
        staff.
      </P>
      <P>
        The migration was completed in just 10 days through close collaboration
        between UFE and AWS engineers. This rapid, seamless transition was
        accomplished without any downtime, allowing students to continue their
        education without interruption despite the exceptional circumstances.
      </P>
      <UnorderedList ml={4} my={4}>
        <ListItem>
          Successfully migrated UFE's online learning management system to AWS
          cloud infrastructure with zero downtime.
        </ListItem>
        <ListItem>
          Delivered a reliable and accessible online educational system, fully
          compatible with AWS, providing uninterrupted access to learning
          resources.
        </ListItem>
        <ListItem>
          Developed a streamlined process for data backup and recovery, ensuring
          secure storage and easy retrieval of critical data.
        </ListItem>
        <ListItem>
          Provided comprehensive training for UFE staff and instructors on AWS
          cloud basics and the new learning management system.
        </ListItem>
        <ListItem>
          Ongoing support and maintenance from AWS engineers to ensure optimal
          system performance.
        </ListItem>
      </UnorderedList>

      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            AWS (EC2, S3, CloudFront, RDS, Elastic Load Balancer, Auto Scaling,
            Route 53), Nginx, PHP, MySQL, Redis, CloudWatch
          </span>
        </ListItem>
        <ListItem>
          <Meta>Case Study</Meta>
          <Link
            href="https://aws.amazon.com/solutions/case-studies/ufe-mongolia-case-study/"
            isExternal
          >
            AWS: UFE Mongolia Case Study <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Reference</Meta>
          <Link href="https://www.ufe.edu.mn/widgetDetail/295" isExternal>
            UFE Online Learning Platform <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Status</Meta>
          <span>Completed</span>
        </ListItem>
      </List>

      <Heading as="h4" fontSize={16} my={6}>
        <Center>More Information</Center>
      </Heading>

      <UnorderedList my={4}>
        <ListItem>
          <Link
            href="https://aws.amazon.com/solutions/case-studies/ufe-mongolia-case-study/"
            isExternal
          >
            <Badge mr={2}>aws.amazon.com</Badge>
            Official AWS Case Study <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </UnorderedList>

      <WorkImage
        src="/images/works/ufe.jpg"
        alt="UFE Online Learning Dashboard"
      />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
