import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  Snackbar,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  ArrowDown,
  Check,
  Code2,
  Copy,
  Download,
  FileText,
  Menu,
  Network,
  X,
} from 'lucide-react'

const base = import.meta.env.BASE_URL
const asset = (path) => `${base}${path}`

const githubUrl = 'https://github.com/Livfour/DyPES-VLA_RELEASE'

const navItems = [
  { label: 'Method', href: '#method' },
  { label: 'Results', href: '#results' },
  { label: 'Robots', href: '#robots' },
  { label: 'Authors', href: '#authors' },
]

const metrics = [
  { value: '89.02%', label: 'RoboTwin 2.0', detail: 'Clean + randomized' },
  { value: '59.25%', label: 'RoboCasa-GR1', detail: '29-DoF humanoid' },
  { value: '98.0%', label: 'LIBERO', detail: 'Four task suites' },
]

const robotResults = [
  { method: 'Diffusion Policy', clean: '28.0', randomized: '0.6', average: '14.30' },
  { method: 'X-VLA', clean: '70.0', randomized: '39.0', average: '54.50' },
  { method: 'π₀.₅', clean: '82.7', randomized: '76.8', average: '79.75' },
  { method: 'ABot-M0', clean: '86.0', randomized: '85.0', average: '85.50' },
  { method: 'Qwen-VLA', clean: '86.1', randomized: '87.2', average: '86.65' },
  { method: 'DyPES-VLA', clean: '88.78', randomized: '89.26', average: '89.02', ours: true },
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

const authors = [
  'Junfeng Li',
  'Junjie He',
  'Zhide Zhong',
  'Yangyang Zheng',
  'Pingyue Sheng',
  'Jiayu Dong',
  'Ruixin Li',
  'Haodong Yan',
  'Jiaguan Zhu',
  'Tianran Zhang',
  'Runze Yu',
  'Wen Chen',
  'Liuqing Yang',
  'Yuxiang Gao',
  'Haoang Li',
]

const bibtex = `@article{li2026dypesvla,
  title   = {DyPES-VLA: Learning Shared Dynamics Priors and
             Embodiment-Specific Control for Cross-Embodiment Manipulation},
  author  = {Li, Junfeng and He, Junjie and Zhong, Zhide and Zheng, Yangyang
             and Sheng, Pingyue and Dong, Jiayu and Li, Ruixin and others},
  journal = {arXiv preprint},
  year    = {2026}
}`

function Header() {
  const [open, setOpen] = useState(false)

  const nav = (
    <>
      {navItems.map((item) => (
        <Button key={item.href} component="a" href={item.href} color="inherit" onClick={() => setOpen(false)}>
          {item.label}
        </Button>
      ))}
    </>
  )

  return (
    <AppBar position="sticky" color="inherit" elevation={0} className="site-header">
      <Container maxWidth="lg" className="header-inner">
        <Link href="#overview" underline="none" className="wordmark" color="text.primary">
          <span>DyPES</span>-VLA
        </Link>
        <Stack direction="row" spacing={0.5} className="desktop-nav" sx={{ alignItems: 'center' }}>
          {nav}
          <Button
            component="a"
            href={asset('DyPES-VLA.pdf')}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            startIcon={<FileText size={17} />}
          >
            Paper
          </Button>
          <Button component="a" href={githubUrl} target="_blank" rel="noreferrer" variant="contained" startIcon={<Code2 size={17} />}>
            Code
          </Button>
        </Stack>
        <Tooltip title="Open navigation">
          <IconButton className="mobile-menu" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu size={22} />
          </IconButton>
        </Tooltip>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box className="mobile-drawer" role="navigation">
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h3">DyPES-VLA</Typography>
            <Tooltip title="Close navigation">
              <IconButton onClick={() => setOpen(false)} aria-label="Close navigation">
                <X size={22} />
              </IconButton>
            </Tooltip>
          </Stack>
          <Divider />
          <Stack spacing={0.5} sx={{ alignItems: 'stretch' }}>
            {nav}
          </Stack>
          <Button component="a" href={asset('DyPES-VLA.pdf')} target="_blank" variant="outlined" startIcon={<FileText size={17} />}>
            Paper
          </Button>
          <Button component="a" href={githubUrl} target="_blank" variant="contained" startIcon={<Code2 size={17} />}>
            Code
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  )
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <Box className="section-heading">
      <Typography variant="overline" color="primary.main">
        {eyebrow}
      </Typography>
      <Typography variant="h2">{title}</Typography>
      {copy && (
        <Typography color="text.secondary" className="section-copy">
          {copy}
        </Typography>
      )}
    </Box>
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
      <Header />
      <main>
        <Box
          id="overview"
          component="section"
          className="hero"
          sx={{ backgroundImage: `url(${asset('assets/real-world-kiwi.jpg')})` }}
        >
          <Box className="hero-tint" />
          <Container maxWidth="lg" className="hero-content">
            <Typography variant="overline" className="hero-kicker">
              Cross-embodiment robot manipulation
            </Typography>
            <Typography variant="h1">
              <Box component="span" color="primary.main">
                DyPES
              </Box>
              -VLA
            </Typography>
            <Typography component="h2" className="hero-subtitle">
              Learning shared dynamics priors and embodiment-specific control
            </Typography>
            <Typography className="hero-copy">
              A single vision-language-action policy learns predictive interaction structure from action-free video,
              then realizes control directly in each robot&apos;s native action space.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} className="hero-actions">
              <Button
                component="a"
                href={asset('DyPES-VLA.pdf')}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                startIcon={<FileText size={18} />}
              >
                Read the paper
              </Button>
              <Button component="a" href={githubUrl} target="_blank" rel="noreferrer" variant="outlined" startIcon={<Code2 size={18} />}>
                View repository
              </Button>
              <Button component="a" href="#method" color="inherit" endIcon={<ArrowDown size={18} />}>
                Explore method
              </Button>
            </Stack>
          </Container>
        </Box>

        <Box component="section" className="metric-band" aria-label="Benchmark highlights">
          <Container maxWidth="lg" className="metric-grid">
            {metrics.map((metric) => (
              <Box key={metric.label} className="metric-item">
                <Typography className="metric-value">{metric.value}</Typography>
                <Typography variant="h3">{metric.label}</Typography>
                <Typography color="text.secondary">{metric.detail}</Typography>
              </Box>
            ))}
          </Container>
        </Box>

        <Box id="method" component="section" className="section section-white">
          <Container maxWidth="lg">
            <SectionHeading
              eyebrow="Method"
              title="Share the dynamics. Specialize the control."
              copy="DyPES-VLA separates predictive interaction knowledge from the robot-specific mechanics required to execute it."
            />
            <Box className="principle-grid">
              <Box className="principle">
                <Network size={25} aria-hidden="true" />
                <Typography variant="h3">Shared dynamics priors</Typography>
                <Typography color="text.secondary">
                  Future-prediction supervision drives shared query states to retain object motion, contact, and
                  interaction-induced scene changes across human and robot video.
                </Typography>
              </Box>
              <Box className="principle principle-accent">
                <ArrowDown size={25} aria-hidden="true" />
                <Typography variant="h3">Embodiment-specific control</Typography>
                <Typography color="text.secondary">
                  A statically routed MoE action head maps the same predictive representation into native single-arm,
                  dual-arm, and humanoid controls without a hand-aligned common action format.
                </Typography>
              </Box>
            </Box>
            <Box component="figure" className="wide-figure">
              <img src={asset('assets/architecture.png')} alt="DyPES-VLA model architecture and two-stage training procedure" />
              <Typography component="figcaption" color="text.secondary">
                One shared VLM interface supports future generation and statically routed action experts. Training starts
                from action-free video and continues with cross-embodiment robot demonstrations.
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box component="section" className="section section-tint">
          <Container maxWidth="lg" className="teaser-layout">
            <Box>
              <SectionHeading
                eyebrow="Cross-embodiment learning"
                title="One predictive interface across different bodies"
                copy="The shared representation carries interaction structure; lightweight routed experts preserve the kinematics and control semantics of each embodiment."
              />
              <Stack className="embodiment-list" divider={<Divider flexItem />}>
                <Box>
                  <Typography variant="h3">Single arm</Typography>
                  <Typography color="text.secondary">Franka Panda in simulation, FR3 in the real world</Typography>
                </Box>
                <Box>
                  <Typography variant="h3">Dual arm</Typography>
                  <Typography color="text.secondary">ALOHA-AgileX in simulation, COBOT Magic in the real world</Typography>
                </Box>
                <Box>
                  <Typography variant="h3">Humanoid</Typography>
                  <Typography color="text.secondary">Fourier GR-1 in simulation, Unitree G1 in the real world</Typography>
                </Box>
              </Stack>
            </Box>
            <Box component="figure" className="teaser-figure">
              <img src={asset('assets/cross-embodiment.png')} alt="Cross-embodiment DyPES-VLA learning paradigm" />
            </Box>
          </Container>
        </Box>

        <Box id="results" component="section" className="section section-white">
          <Container maxWidth="lg">
            <SectionHeading
              eyebrow="Results"
              title="Robust under clean and randomized evaluation"
              copy="RoboTwin 2.0 evaluates the same 50 bimanual tasks in clean and domain-randomized environments. DyPES-VLA leads both settings with a single jointly trained checkpoint."
            />
            <TableContainer className="results-table">
              <Table aria-label="RoboTwin 2.0 benchmark results">
                <TableHead>
                  <TableRow>
                    <TableCell>Method</TableCell>
                    <TableCell align="right">Clean</TableCell>
                    <TableCell align="right">Randomized</TableCell>
                    <TableCell align="right">Average</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {robotResults.map((row) => (
                    <TableRow key={row.method} className={row.ours ? 'ours-row' : undefined}>
                      <TableCell component="th" scope="row">
                        {row.ours ? <strong>{row.method}</strong> : row.method}
                      </TableCell>
                      <TableCell align="right">{row.ours ? <strong>{row.clean}</strong> : row.clean}</TableCell>
                      <TableCell align="right">{row.ours ? <strong>{row.randomized}</strong> : row.randomized}</TableCell>
                      <TableCell align="right">{row.ours ? <strong>{row.average}</strong> : row.average}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>

        <Box id="robots" component="section" className="section section-dark">
          <Container maxWidth="lg">
            <SectionHeading
              eyebrow="Real-world deployment"
              title="Three tasks. Three bodies. One jointly finetuned checkpoint."
              copy="Representative rollouts on FR3, COBOT Magic, and G1. Select a task to compare the same command across all three physical embodiments."
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
            <Box component="figure" className="demo-figure">
              <img src={asset(demos[demo].src)} alt={demos[demo].alt} />
              <Typography component="figcaption">
                Average real-world success: <strong>75.6%</strong> across nine embodiment-task pairs, evaluated with 25
                independent rollouts per pair.
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box id="authors" component="section" className="section section-white">
          <Container maxWidth="lg">
            <SectionHeading eyebrow="Team" title="Authors" />
            <Box className="authors-list" aria-label="Paper authors">
              {authors.map((author, index) => (
                <Typography component="span" key={author}>
                  {author}
                  {index < authors.length - 1 ? ',' : ''}
                </Typography>
              ))}
            </Box>
            <Box className="affiliations">
              <Typography>
                <strong>The Hong Kong University of Science and Technology (Guangzhou)</strong>
              </Typography>
              <Typography>
                <strong>CoCoMatrix</strong>, Shanghai
              </Typography>
              <Typography color="text.secondary">
                Junfeng Li, Junjie He, Zhide Zhong, and Yangyang Zheng contributed equally. Zhide Zhong is Project
                Leader. Haoang Li is corresponding author.
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box component="section" className="section citation-section">
          <Container maxWidth="lg">
            <Box className="citation-header">
              <Box>
                <Typography variant="overline" color="primary.main">
                  Citation
                </Typography>
                <Typography variant="h2">Cite DyPES-VLA</Typography>
              </Box>
              <Tooltip title={copied ? 'Copied' : 'Copy BibTeX'}>
                <IconButton onClick={copyCitation} aria-label="Copy BibTeX citation" className="copy-button">
                  {copied ? <Check size={21} /> : <Copy size={21} />}
                </IconButton>
              </Tooltip>
            </Box>
            <Box component="pre" className="bibtex">
              <code>{bibtex}</code>
            </Box>
          </Container>
        </Box>
      </main>

      <Box component="footer" className="footer">
        <Container maxWidth="lg" className="footer-inner">
          <Box>
            <Typography variant="h3">DyPES-VLA</Typography>
            <Typography color="text.secondary">Shared dynamics priors. Embodiment-specific control.</Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button component="a" href={asset('DyPES-VLA.pdf')} startIcon={<Download size={17} />}>
              Download paper
            </Button>
            <Button component="a" href={githubUrl} target="_blank" rel="noreferrer" startIcon={<Code2 size={17} />}>
              GitHub
            </Button>
          </Stack>
        </Container>
      </Box>
      <Snackbar open={copied} autoHideDuration={2200} onClose={() => setCopied(false)} message="BibTeX copied" />
    </>
  )
}

export default App
