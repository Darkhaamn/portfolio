import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import { WorkGridItem } from '../components/grid-item'
import Layout from '../components/layouts/article'
import Section from '../components/section'

import thumbCloudmn from '../public/images/works/cloudmn.png'
import thumbEasysim from '../public/images/works/easysim.png'
import thumbItrip from '../public/images/works/itrip.png'
import thumbMedtech from '../public/images/works/medtech.png'
import thumbTtc from '../public/images/works/ttc.png'
import thumbUfe from '../public/images/works/ufe.jpg'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem id="cloudmn" title="Cloud.mn" thumbnail={thumbCloudmn}>
            Mongolia&apos;s first public cloud platform, allowing users to
            create and manage virtual machines, storage, and networks.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem id="ttc" title="TTC Cloud" thumbnail={thumbTtc}>
            Kazakhstan’s leading public cloud platform for enterprises.
          </WorkGridItem>
        </Section>
      </SimpleGrid>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="ufe_aws"
            title="UFE Online Learning on AWS"
            thumbnail={thumbUfe}
          >
            Migrated one of Mongolia’s largest universities to AWS during
            COVID-19, ensuring reliable online learning for thousands of
            students.
          </WorkGridItem>
        </Section>

        <Section>
          <WorkGridItem
            id="easysim"
            title="EasySim.mn"
            thumbnail={thumbEasysim}
          >
            International eSIM services for travelers, powered by a Mongolian
            super app.
          </WorkGridItem>
        </Section>

        <Section>
          <WorkGridItem
            id="medtech"
            title="MedOrder Eco System"
            thumbnail={thumbMedtech}
          >
            How Innovative Tech Solutions are Changing the HealthCare industry
            Game
          </WorkGridItem>
        </Section>

        <Section>
          <WorkGridItem
            id="itrip"
            title="Itrip.mn"
            thumbnail={thumbItrip}
          >
            Mongolia’s all-in-one travel booking platform.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
