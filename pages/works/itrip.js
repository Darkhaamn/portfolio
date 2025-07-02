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
  UnorderedList,
  useColorMode
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import P from '../../components/paragraph'
import { Meta, Title, WorkImage } from '../../components/work'

const Work = () => {
  const { colorMode } = useColorMode()
  const logoSrc =
    colorMode === 'dark'
      ? '/images/works/itrip-white.svg'
      : '/images/works/itrip.svg'

  return (
    <Layout title="iTrip Online Travel Platform">
      <Container>
        <Title>
          iTrip Online Travel Platform <Badge>2023</Badge>
        </Title>
        <Center my={6}>
          <Image src={logoSrc} alt="iTrip logo" />
        </Center>
        <P>
          <b>iTrip</b> is a comprehensive online travel platform developed and launched by our IT agency in close collaboration with a talented team of designers, engineers, and business stakeholders. The project aimed to revolutionize the online travel industry in Mongolia and enhance the overall travel booking experience for customers.
        </P>
        <P>
          Prior to iTrip, available services in the market were fragmented and lacked integration, making travel planning inconvenient for customers. Recognizing the need for a unified solution, our team worked together to improve customer service efficiency and increase profitability for the business.
        </P>
        <P>
          With a customer-centric approach, the iTrip platform was designed and built as a one-stop solution for hotel bookings, flight reservations, and tour packages. The platform features robust capabilities such as order management, automatic information updates, online payment integration, and efficient back-office management, all made possible by the collective efforts of our cross-functional team.
        </P>
        <P>
          The result is an enhanced travel booking experience. Customers can now seamlessly browse and book various travel services through a single platform, eliminating the need for multiple applications or websites and saving precious time and effort.
        </P>
        <P>
          iTrip benefits both the company and its customers. The streamlined and efficient processes provided by the platform ensure smoother operations for our clients, leading to increased profitability. On the customers' end, they enjoy a hassle-free booking experience with access to real-time information, secure payments, and reliable customer support.
        </P>
        <P>
          By introducing iTrip, our team has contributed to transforming the online travel industry, offering an enhanced experience that brings convenience, efficiency, and reliability to travelers. Experience the difference for yourself by joining countless satisfied customers on the platform.
        </P>

        <Heading as="h4" fontSize={16} my={6}>
          <Center>Key Works & Features</Center>
        </Heading>

        <UnorderedList ml={4} my={4}>
          <ListItem>
            <b>UX/UI Design Sprint:</b> The design team conducted a UX/UI design sprint to create a user-centric and visually appealing interface, including user research, prototyping, and iterative design for a seamless experience.
          </ListItem>
          <ListItem>
            <b>Microservices Architecture:</b> The engineering team implemented a microservices architecture for scalability, flexibility, and ease of maintenance.
          </ListItem>
          <ListItem>
            <b>Cloud, Containers & Kubernetes:</b> Cloud technologies (AWS/Azure), containers, and Kubernetes were utilized for scalable, reliable, and efficient deployment and management.
          </ListItem>
          <ListItem>
            <b>Airticket GDS API Connections:</b> The platform was integrated with Amadeus.com and Route24 for real-time flight data, fares, and reservations.
          </ListItem>
          <ListItem>
            <b>Travel API Connections:</b> Integration with Viator.com enables users to access tours, activities, and attractions.
          </ListItem>
          <ListItem>
            <b>Hotel API Connections:</b> The team connected the platform with Trip.com and Ihotel.mn for comprehensive hotel selection and real-time availability.
          </ListItem>
          <ListItem>
            <b>Online Payment Integration:</b> Secure payments were enabled via banking systems and smart wallets.
          </ListItem>
          <ListItem>
            <b>Unit Testing & Integration Testing:</b> Robust unit and integration testing were implemented to ensure quality and stability.
          </ListItem>
        </UnorderedList>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>Stack</Meta>
            <span>
              React, Golang, DotNet, Microservices, AWS, Docker, Kubernetes,
              Nginx, MySQL, Redis, Amadeus API, Route24 API, Viator API,
              Airalab API, Trip.com API, Ihotel.mn API, Payment Gateways,
              RabbitMQ
            </span>
          </ListItem>
          <ListItem>
            <Meta>Reference</Meta>
            <Link href="https://itrip.mn/" isExternal>
              iTrip.mn <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Status</Meta>
            <span>Launched & Ongoing</span>
          </ListItem>
        </List>

        <Heading as="h4" fontSize={16} my={6}>
          <Center>More Information</Center>
        </Heading>

        <UnorderedList my={4}>
          <ListItem>
            <Link href="https://itrip.mn/" isExternal>
              <Badge mr={2}>itrip.mn</Badge>
              Official Platform <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </UnorderedList>

        <WorkImage
          src="/images/works/itrip.png"
          alt="iTrip Online Travel Platform Dashboard"
        />

        <WorkImage
          src="/images/works/itrip-2.png"
          alt="iTrip Online Travel Platform Dashboard"
        />
      </Container>
    </Layout>
  )
}

export default Work
export { getServerSideProps } from '../../components/chakra'
