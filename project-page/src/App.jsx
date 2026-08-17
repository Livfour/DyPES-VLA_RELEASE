import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  IconButton,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Quote,
} from 'lucide-react'

const base = import.meta.env.BASE_URL
const asset = (path) => `${base}${path}`
const arxivUrl = 'https://arxiv.org/abs/2608.06374'

const authors = [
  { name: 'Junfeng Li', affiliation: 1, equal: true, url: 'https://livfour.github.io/' },
  {
    name: 'Junjie He',
    affiliation: 1,
    equal: true,
    url: 'https://scholar.google.com/citations?user=XfI8K5MAAAAJ&hl=en',
  },
  {
    name: 'Zhide Zhong',
    affiliation: 1,
    equal: true,
    project: true,
    url: 'https://scholar.google.com/citations?user=msy4tL4AAAAJ&hl=en',
  },
  {
    name: 'Yangyang Zheng',
    affiliation: 1,
    equal: true,
  },
  { name: 'Pingyue Sheng', affiliation: 2 },
  { name: 'Jiayu Dong', affiliation: 2 },
  { name: 'Ruixin Li', affiliation: 1 },
  { name: 'Haodong Yan', affiliation: 1, url: 'https://haodong-yan.github.io/' },
  { name: 'Jiaguan Zhu', affiliation: 1 },
  { name: 'Tianran Zhang', affiliation: 1, url: 'https://page.ryanzhangtianran.top/' },
  { name: 'Runze Yu', affiliation: 1 },
  { name: 'Wen Chen', affiliation: 1 },
  { name: 'Liuqing Yang', affiliation: 1 },
  { name: 'Yuxiang Gao', affiliation: 2 },
  {
    name: 'Haoang Li',
    affiliation: 1,
    corresponding: true,
    url: 'https://sites.google.com/view/haoangli/homepage',
  },
]

const metrics = [
  { value: '98.0%', label: 'LIBERO', detail: 'Four task suites' },
  { value: '59.25%', label: 'RoboCasa-GR1', detail: '29-DoF humanoid' },
  { value: '89.02%', label: 'RoboTwin 2.0', detail: 'Clean + randomized' },
]

const demos = [
  {
    label: 'Kiwi to basket',
    src: 'assets/real-world-kiwi.jpg',
    alt: 'FR3, COBOT Magic, and G1 robots placing a kiwi into a basket',
  },
  {
    label: 'Pour water',
    src: 'assets/real-world-pour.jpg',
    alt: 'FR3, COBOT Magic, and G1 robots performing a water pouring task',
  },
  {
    label: 'Book to shelf',
    src: 'assets/real-world-book.jpg',
    alt: 'FR3, COBOT Magic, and G1 robots placing a book onto a shelf',
  },
]

const bibtex = `@misc{li2026dypesvlalearningshareddynamics,
  title={DyPES-VLA: Learning Shared Dynamics Priors and Embodiment-Specific Control for Cross-Embodiment Manipulation},
  author={Junfeng Li and Junjie He and Zhide Zhong and Yangyang Zheng and Pingyue Sheng and Jiayu Dong and Ruixin Li and Haodong Yan and Jiaguan Zhu and Tianran Zhang and Runze Yu and Wen Chen and Liuqing Yang and Yuxiang Gao and Haoang Li},
  year={2026},
  eprint={2608.06374},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2608.06374}
}`

function SectionHeading({ title, copy, eyebrow }) {
  return (
    <Box className="project-heading">
      {eyebrow && <Typography variant="overline">{eyebrow}</Typography>}
      <Typography variant="h2">{title}</Typography>
      <Box className="heading-rule" aria-hidden="true" />
      {copy && <Typography className="project-heading-copy">{copy}</Typography>}
    </Box>
  )
}

function CodeComingSoon({ iconSize = 16, variant = 'text' }) {
  return (
    <Button
      className="code-coming-soon"
      disabled
      variant={variant}
      startIcon={<Code2 size={iconSize} />}
    >
      Code (coming soon)
    </Button>
  )
}

function App() {
  const [demo, setDemo] = useState(0)
  const [copied, setCopied] = useState(false)

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(bibtex)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = bibtex
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    setCopied(true)
  }

  return (
    <>
      <main>
        <Box component="div" className="site-masthead">
          <Container maxWidth="md">
            <Typography className="masthead-wordmark">DyPES-VLA</Typography>
          </Container>
        </Box>

        <Box component="header" className="paper-hero">
          <Container maxWidth="md" className="paper-hero-inner">
            <Typography variant="overline" className="paper-kicker">
              Cross-embodiment robot manipulation · Vision-language-action
            </Typography>
            <Typography variant="h1" className="paper-title">
              <Box component="span">DyPES-VLA:</Box> Learning Shared Dynamics Priors and Embodiment-Specific Control
              for Cross-Embodiment Manipulation
            </Typography>

            <Box className="hero-authors" aria-label="Paper authors">
              {authors.map((author) => (
                <Typography
                  component={author.url ? 'a' : 'span'}
                  href={author.url}
                  target={author.url ? '_blank' : undefined}
                  rel={author.url ? 'noreferrer' : undefined}
                  className={author.url ? 'author-link' : undefined}
                  key={author.name}
                >
                  {author.name}
                  <sup>
                    {author.affiliation}
                    {author.equal ? '*' : ''}
                    {author.project ? '‡' : ''}
                    {author.corresponding ? '†' : ''}
                  </sup>
                </Typography>
              ))}
            </Box>

            <Typography className="author-notes">* Equal contribution · ‡ Project Leader · † Corresponding author</Typography>
            <Box className="hero-affiliations">
              <Typography>
                <sup>1</sup> The Hong Kong University of Science and Technology, Guangzhou
              </Typography>
              <Typography>
                <sup>2</sup> COCO Matrix, Shanghai
              </Typography>
            </Box>

            <Stack direction="row" className="paper-actions" useFlexGap>
              <Button
                component="a"
                href={arxivUrl}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                startIcon={<ExternalLink size={18} />}
              >
                arXiv
              </Button>
              <Button
                component="a"
                href={asset('DyPES-VLA.pdf')}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<FileText size={18} />}
              >
                PDF
              </Button>
              <CodeComingSoon iconSize={18} variant="outlined" />
              <Button component="a" href="#bibtex" variant="outlined" startIcon={<Quote size={18} />}>
                BibTeX
              </Button>
            </Stack>
          </Container>
        </Box>

        <Box component="section" className="project-section section-white">
          <Container maxWidth="lg" className="abstract-layout">
            <Box className="abstract-panel">
              <SectionHeading title="Abstract" eyebrow="01" />
              <Typography className="abstract-copy">
                Vision-Language-Action (VLA) models have become a powerful paradigm for robot manipulation, but training
                a single generalist policy for heterogeneous robot embodiments remains an open problem. Existing methods
                underuse dynamics priors shared across diverse visual and interaction data and require extensive manual
                preprocessing to convert embodiment-specific actions into a common format. To overcome these limitations,
                we propose <strong>DyPES-VLA</strong>, a cross-embodiment VLA that learns shared dynamics priors through
                future-prediction supervision and realizes embodiment-specific control directly in each robot&apos;s native
                action space. A shared-attention, statically routed MoE action head captures common temporal structures
                while resolving embodiment-specific kinematics and control semantics. As a generalist policy, DyPES-VLA
                reaches 98.0% success on LIBERO, 59.25% on RoboCasa-GR1, and 89.02% on RoboTwin 2.0.
              </Typography>
            </Box>
            <Box className="abstract-design-panel">
              <SectionHeading title="Cross-Embodiment Design" eyebrow="02" />
              <Box component="figure" className="paper-figure abstract-design-figure">
                <img src={asset('assets/cross-embodiment.png')} alt="Cross-embodiment DyPES-VLA learning paradigm" />
                <Typography component="figcaption">
                  One predictive interface supports single-arm, dual-arm, and humanoid systems, while statically routed
                  MoE experts learn embodiment-specific ways of acting directly in each robot&apos;s native control space.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box id="method" component="section" className="project-section section-tint">
          <Container maxWidth="lg">
            <SectionHeading title="Method Overview" eyebrow="03" />
            <Box component="figure" className="paper-figure method-figure">
              <img src={asset('assets/architecture.png')} alt="DyPES-VLA model architecture and two-stage training procedure" />
              <Typography component="figcaption">
                <strong>Overview of DyPES-VLA.</strong> (a) A pretrained Vision Language Model maps observations,
                instructions, embodiment metadata, and learnable query tokens into query states that carry the shared
                dynamics priors. A future generation head predicts the future frame from these states, and an
                embodiment-specific Mixture-of-Experts (MoE) action head decodes them into actions in each
                embodiment&apos;s native action space. The action head shares attention layers across embodiments, while a
                static router selects the embodiment-specific encoder, feed-forward expert, and decoder. (b) Two-stage
                training: Dynamics Priors Pretraining on action-free videos, followed by Cross-Embodiment Co-Training
                on action-labeled robot demonstrations.
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box id="results" component="section" className="project-section section-white results-section">
          <Container maxWidth="lg">
            <SectionHeading
              title="Quantitative Results"
              copy="A Single Checkpoint"
              eyebrow="04"
            />
            <Box className="benchmark-grid" aria-label="Benchmark highlights">
              {metrics.map((metric) => (
                <Box key={metric.label} className="benchmark-item">
                  <Typography className="benchmark-value">{metric.value}</Typography>
                  <Typography variant="h3">{metric.label}</Typography>
                  <Typography>{metric.detail}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        <Box id="robots" component="section" className="project-section section-tint">
          <Container maxWidth="lg">
            <SectionHeading
              title="Real-World Experiments"
              copy="One jointly finetuned checkpoint controls FR3, COBOT Magic, and G1 across three manipulation tasks."
              eyebrow="05"
            />
            <Tabs
              value={demo}
              onChange={(_, value) => setDemo(value)}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Real-world task demonstrations"
              className="demo-tabs"
            >
              {demos.map((item) => (
                <Tab key={item.label} label={item.label} />
              ))}
            </Tabs>
            <Box component="figure" className="paper-figure demo-figure">
              <img src={asset(demos[demo].src)} alt={demos[demo].alt} />
              <Typography component="figcaption">
                <strong>Average real-world success: 75.6%.</strong> Each image compares the same instruction across three
                physical embodiments, evaluated with 25 independent rollouts per embodiment-task pair.
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box id="bibtex" component="section" className="project-section citation-section">
          <Container maxWidth="md">
            <SectionHeading title="BibTeX" eyebrow="06" />
            <Box className="citation-wrap">
              <Tooltip title={copied ? 'Copied' : 'Copy BibTeX'}>
                <IconButton onClick={copyCitation} aria-label="Copy BibTeX citation" className="copy-button">
                  {copied ? <Check size={19} /> : <Copy size={19} />}
                </IconButton>
              </Tooltip>
              <Box component="pre" className="bibtex">
                <code>{bibtex}</code>
              </Box>
            </Box>
          </Container>
        </Box>
      </main>

      <Box component="footer" className="footer">
        <Container maxWidth="lg" className="footer-inner">
          <Typography>© 2026 DyPES-VLA Authors · HKUST (GZ) &amp; COCO Matrix</Typography>
          <Stack direction="row" spacing={0.5}>
            <Button component="a" href={arxivUrl} target="_blank" rel="noreferrer" startIcon={<ExternalLink size={16} />}>
              arXiv
            </Button>
            <Button
              component="a"
              href={asset('DyPES-VLA.pdf')}
              target="_blank"
              rel="noreferrer"
              startIcon={<FileText size={16} />}
            >
              PDF
            </Button>
            <CodeComingSoon />
          </Stack>
        </Container>
      </Box>
      <Snackbar open={copied} autoHideDuration={2200} onClose={() => setCopied(false)} message="BibTeX copied" />
    </>
  )
}

export default App
