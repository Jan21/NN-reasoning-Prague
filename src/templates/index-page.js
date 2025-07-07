import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage, StaticImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Speakers from "../components/Speakers";
import FullWidthImage from "../components/FullWidthImage";

// Sample speaker data - you'll likely want to move this to your CMS or a data file later
const sampleSpeakers = [

  { name: "Core Francisco Park (online)", 
    works: "Harvard",
    image: "../img/speakers/francisco.jpg", 
    title: "New News: System-2 Fine-tuning for Robust Integration of New Knowledge",
    abstract: "Abstract: Humans and intelligent animals can effortlessly internalize new information (news) and accurately extract the implications for performing downstream tasks. While large language models (LLMs) can achieve this through in-context learning (ICL) when the news is explicitly given as context, fine-tuning remains challenging for the models to consolidate learning in weights. In this paper, we introduce New News, a dataset composed of hypothetical yet plausible news spanning multiple domains (mathematics, coding, discoveries, leaderboards, events), accompanied by downstream evaluation questions whose correct answers critically depend on understanding and internalizing the news. We first demonstrate a substantial gap between naive fine-tuning and in-context learning (FT-ICL gap) on our news dataset. To address this gap, we explore a suite of self-play data generation protocols -- paraphrases, implications and Self-QAs -- designed to distill the knowledge from the model with context into the weights of the model without the context, which we term System-2 Fine-tuning (Sys2-FT). We systematically evaluate ICL and Sys2-FT performance across data domains and model scales with the Qwen 2.5 family of models. Our results demonstrate that the self-QA protocol of Sys2-FT significantly improves models' in-weight learning of the news. Furthermore, we discover the contexual shadowing effect, where training with the news in context followed by its rephrases or QAs degrade learning of the news. Finally, we show preliminary evidence of an emerging scaling law of Sys2-FT."
  },
  { name: "Kazuki Irie (online)", 
    works: "Harvard",
    image: "../img/speakers/kazuki.jpg", 
    title: "Incentives in Learning Machines",
    abstract: "Abstract: TBD"
  },
  { name: "Naomi Saphra (online)", 
    works: "Harvard",
    image: "../img/speakers/naomi.jpg", 
    title: "You Know It Or You Don’t: Phase Transitions, Clustering, and Random Variation in Language Model Training",
    abstract: "Abstract: While years of scientific research on model training and scaling assume that learning is a gradual and continuous process, breakthroughs on specific capabilities have drawn wide attention. Why are breakthroughs so exciting? Because humans don’t naturally think in continuous gradients, but in discrete conceptual categories. If artificial language models naturally learn discrete conceptual categories, perhaps model understanding is within our grasp. In this talk, In this talk, I will describe what we know of categorical learning in language models, and how discrete concepts are identifiable through empirical training dynamics and through random variation between training runs. These concepts involve syntax learning, out of distribution generalization, and “emergent” capabilities. By leveraging categorical learning, we can ultimately understand a model's natural conceptual structure."
  },
  { name: "Róbert Csordás", 
    works: "Stanford",
    image: "../img/speakers/csordas.jpg", 
    title: " Towards Compositional Generalization and Latent Reasoning in Neural Networks",
    abstract: "Abstract: Much of the recent interest in LLMs focuses on the reasoning capabilities of the models. Modern reasoning models are primarily based on chain-of-thought, which breaks down and solves the problem in the token space. This, however, poses many limitations: there is a discrepancy between the pretraining and reasoning regimes, biasing the models towards potentially incorrect solutions, the recurrent state is a single, discrete token, and the reasoning chain must match the distribution of the training data. I advocate solving these problems using neural architectures that can natively break down problems into subproblems in the latent space, solving them individually and composing their results together to solve the full problem. Such models should be biased towards representing the computation graph of the problem faithfully to the underlying algorithm, but should also be flexible enough to allow learning less structured problems. In this talk, I will show some initial steps towards such models and demonstrate some failure modes of the current LLMs."
  },
  { name: "William T. Redman (online)", 
    works: "Johns Hopkins",
    image: "../img/speakers/william.jpg", 
    title: "Koopman Learning with Episodic Memory",
    abstract: "Abstract: Koopman operator theory has found significant success in learning models of complex, real-world dynamical systems, enabling prediction and control. The greater interpretability and lower computational costs of these models, compared to traditional machine learning methodologies, make Koopman learning an especially appealing approach. Despite this, little work has been performed on endowing Koopman learning with the ability to leverage its own failures. To address this, we equip Koopman methods -- developed for predicting non-autonomous time-series -- with an episodic memory mechanism, enabling global recall of (or attention to) periods in time where similar dynamics previously occurred. We find that a basic implementation of Koopman learning with episodic memory leads to significant improvements in prediction on synthetic and real-world data. Our framework has considerable potential for expansion, allowing for future advances, and opens exciting new directions for Koopman learning."
  },
  { name: "Federico Barbero", 
    works: "Oxford",
    image: "../img/speakers/federico.jpg", 
    title: "Why is Long-context Reasoning with LLMs Hard?",
    abstract: "Abstract: Robust reasoning with LLMs over long-context is hard! Frontier models seem to hallucinate or simply output wrong answers. Trying to understand exactly what is going wrong is not an easy task, but it is important to help improve the models of tomorrow. In this talk, I will go over efforts that aim to understand more precisely why long-context reasoning is hard, what goes wrong inside current models, and ways to improve this. I will argue that a main issue that LLMs encounter is that of “over-mixing” — the fact that attention mechanisms tend to act as “averaging” operations and that this averaging destroys information as the context length increases. I will also go over positional encodings and phenomena like attention sinks and the role they play in robust reasoning. Overall, the talk aims to show how one can study failure in long-context regimes “from first principles”, by understanding the mechanisms that are used by LLMs to construct the output. "
  },

  { name: "Jonas Hübotter (online)", 
    works: "ETH Zurich",
    image: "../img/speakers/jonas.jpg", 
    title: "Towards Solving Hard Problems through Test-time Training",
    abstract: "Abstract: Recent efforts in fine-tuning language models often rely on automatic data selection, commonly using Nearest Neighbors retrieval from large datasets. However, we theoretically show that this approach tends to select redundant data, limiting its effectiveness or even hurting performance. To address this, we introduce SIFT, a data selection algorithm designed to reduce uncertainty about the model's response given a prompt, which unifies ideas from retrieval and active learning. Whereas Nearest Neighbor retrieval typically fails in the presence of information duplication, SIFT accounts for information duplication and optimizes the overall information gain of the selected examples. We focus our evaluations on fine-tuning at test-time for prompt-specific language modeling on the Pile dataset, and show that SIFT consistently outperforms Nearest Neighbor retrieval, with minimal computational overhead. Moreover, we show that our uncertainty estimates can predict the performance gain of test-time fine-tuning, and use this to develop an adaptive algorithm that invests test-time compute proportional to realized performance gains."
  },
  { name: "Aryo Lotfi", 
    works: "EPFL",
    image: "../img/speakers/aryosq.jpg", 
    title: "Breaking Barriers to Global Reasoning Via Chain-of-Thought Methodologies",
    abstract: "Abstract: This talk explores the limitations of Transformers in performing global reasoning—tasks where individual tokens provide little useful signal. The notion of globality is introduced to formalize this challenge, characterizing the number of tokens required to correlate meaningfully with the target. High-globality tasks, such as connectivity problems, are shown to be difficult for standard Transformers and Vision Transformers to learn efficiently. Scratchpad and chain-of-thought strategies are shown to help circumvent this limitation by introducing intermediate reasoning steps that break the globality. A vision analogue, termed chain-of-sketch, is proposed to address global reasoning in visual domains. Finally, inductive variants of chain-of-thought and chain-of-sketch methodologies are introduced, which afford improved out-of-distribution generalization by imposing a Markovian structure over intermediate reasoning steps."
  },
  { name: "Takeru Miyato (online)", 
    works: "U. Tübingen",
    image: "../img/speakers/takeru.jpg", 
    title: "Artificial Kuramoto Oscillatory Neurons",
    abstract: "Abstract: It has long been known in both neuroscience and AI that ``binding'' between neurons leads to a form of competitive learning where representations are compressed in order to represent more abstract concepts in deeper layers of the network. More recently, it was also hypothesized that dynamic (spatiotemporal) representations play an important role in both neuroscience and AI. Building on these ideas, we introduce Artificial Kuramoto Oscillatory Neurons (AKOrN) as a dynamical alternative to threshold units, which can be combined with arbitrary connectivity designs such as fully connected, convolutional, or attentive mechanisms. Our generalized Kuramoto updates bind neurons together through their synchronization dynamics. We show that this idea provides performance improvements across a wide spectrum of tasks such as unsupervised object discovery, adversarial robustness, calibrated uncertainty quantification, and reasoning. We believe that these empirical results show the importance of rethinking our assumptions at the most basic neuronal level of neural representation, and in particular show the importance of dynamical representations."
  },
  { name: "Sebastian Risi (online)", 
    works: "Sakana AI, IT University of Copenhagen",
    image: "../img/speakers/sebastian.webp", 
    title: "Self-Organizing Intelligence: From Plastic Synapses to Continuous Thought",
    abstract: "Abstract: Biological brains demonstrate complex neural activity, where the timing and interplay between neurons is critical to how brains process information. Most deep learning architectures simplify neural activity by abstracting away temporal dynamics. In this paper we challenge that paradigm. By incorporating neuron-level processing and synchronization, we can effectively reintroduce neural timing as a foundational element. We present the Continuous Thought Machine (CTM), a model designed to leverage neural dynamics as its core representation. The CTM has two core innovations: (1) neuron-level temporal processing, where each neuron uses unique weight parameters to process a history of incoming signals; and (2) neural synchronization employed as a latent representation. The CTM aims to strike a balance between oversimplified neuron abstractions that improve computational efficiency, and biological realism. It operates at a level of abstraction that effectively captures essential temporal dynamics while remaining computationally tractable for deep learning. We demonstrate the CTM's strong performance and versatility across a range of challenging tasks, including ImageNet-1K classification, solving 2D mazes, sorting, parity computation, question-answering, and RL tasks. Beyond displaying rich internal representations and offering a natural avenue for interpretation owing to its internal process, the CTM is able to perform tasks that require complex sequential reasoning. The CTM can also leverage adaptive compute, where it can stop earlier for simpler tasks, or keep computing when faced with more challenging instances. The goal of this work is to share the CTM and its associated innovations, rather than pushing for new state-of-the-art results. To that end, we believe the CTM represents a significant step toward developing more biologically plausible and powerful artificial intelligence systems."
  },


  { name: "Mirek Olšák", 
    works: "Cambridge/DeepMind",
    image: "../img/speakers/mirek.jpg", 
    title: "Looking for a Game",
    abstract: "Abstract: We address the question of what kind of formal reasoning system are ideal to be used by a neural network. We look at the important aspects of various logical systems, as well as some specific domains (puzzle games, AlphaGeometry)."
  },
  { name: "Mikoláš Janota", 
    works: "CIIRC",
    image: "../img/speakers/mikolas.jpg", 
    title: "Introduction to Boolean Satisfiability and CDCL solvers",
    abstract: "Abstract: TBD"
  },
  { name: "Tomáš Pajdla", 
    works: "CIIRC",
    image: "../img/speakers/tpajdla.jpg", 
    title: "Algebraic Structure of R-PolyNets Neural Networks",
    abstract: "Abstract: TBD"
  },
  { name: "Vít Musil", 
    works: "MUNI",
    image: "/img/speakers/vejteksq2.jpg", 
    title: "Optimization Layers in Neural Networks",
    abstract: "Abstract: While neural networks excel at learning complex patterns from raw data, they often struggle with tasks that involve combinatorial or algorithmic reasoning. In contrast, graph algorithms and classical optimization methods offer strong solutions for such problems when given clean specifications. This talk explores how these two areas can be effectively combined. We provide an overview of methods that enable end-to-end training of compositional architectures by incorporating (discrete) optimization problems into neural networks to enhance their algorithmic capabilities."
  },
  { 
    name: "Alicja Ziarko", 
    works: "IDEAS NCBR",
    image: "../img/speakers/alicja.jpg", 
    title: "Contrastive Representations for Combinatorial Reasoning", 
    abstract: "Abstract: Combinatorial optimization lies at the heart of many impactful applications, from logistics and scheduling to scientific discovery. While classical algorithms have long dominated this domain, recent machine learning advances have introduced neural approaches that learn adaptive, data-driven strategies, sometimes outperforming handcrafted heuristics on NP-hard problems. The rise of large language models (LLMs) has further sparked interest in whether sheer scale can unlock combinatorial reasoning. Yet, despite their versatility, LLMs often struggle with the structured, step-by-step precision these problems demand. In this talk, I’ll explore the evolving landscape of neural methods for combinatorial optimization, including approaches that integrate learning with search. I’ll highlight emerging architectures such as SearchFormers and subgoal-driven models, and present our recent work on learning representations whose structure mirrors the underlying combinatorial problem -- enabling models to reason in alignment with the problem’s inherent structure. Together, these developments point toward a future where neural models reason not just broadly, but with the rigor that structured domains demand."
  },
  { name: "Gracjan Góral", 
    works: "IDEAS NCBR",
    image: "../img/speakers/gracjansq.jpg", 
    title: "What Matters in Hierarchical Search for Combinatorial Reasoning Problems?",
    abstract: "Abstract: Efficiently tackling combinatorial reasoning problems, particularly the notorious NP-hard tasks, remains a significant challenge for AI research. Recent efforts have sought to enhance planning by incorporating hierarchical high-level search strategies, known as subgoal methods. While promising, their performance against traditional low-level planners is inconsistent, raising questions about their application contexts. In this study, we conduct an in-depth exploration of subgoal-planning methods for combinatorial reasoning. We identify the attributes pivotal for leveraging the advantages of high-level search: hard-to-learn value functions, complex action spaces, presence of dead ends in the environment, or using data collected from diverse experts. We propose a consistent evaluation methodology to achieve meaningful comparisons between methods and reevaluate the state-of-the-art algorithms. "
  },
  { name: "Witold Drzewakowski", 
    works: "IDEAS NCBR",
    image: "../img/speakers/witek.jpeg", 
    title: "Lightweight Latent Verifiers for Efficient Meta-Generation Strategies",
    abstract: "Abstract: Verifiers are auxiliary models that assess the correctness of outputs generated by base large language models (LLMs). They play a crucial role in many strategies for solving reasoning-intensive problems with LLMs. Typically, verifiers are LLMs themselves, often as large (or larger) than the base model they support, making them computationally expensive. In this work, we introduce a novel lightweight verification approach, LiLaVe, which reliably extracts correctness signals from the hidden states of the base LLM. A key advantage of LiLaVe is its ability to operate with only a small fraction of the computational budget required by traditional LLM-based verifiers. To demonstrate its practicality, we couple LiLaVe with popular meta-generation strategies, like best-of-n or self-consistency. Moreover, we design novel LiLaVe-based approaches, like conditional self-correction or conditional majority voting, that significantly improve both accuracy and efficiency in generation tasks with smaller LLMs. Our work demonstrates the fruitfulness of extracting latent information from the hidden states of LLMs, and opens the door to scalable and resource-efficient solutions for reasoning-intensive applications."
  },
  { name: "Nanbo Li (online)", 
    works: "KAUST",
    image: "../img/speakers/nanbo.jpg", 
    title: "FACTS: A Factored State-Space Framework For World Modelling",
    abstract: "Abstract: World modelling is essential for understanding and predicting the dynamics of complex systems by learning both spatial and temporal dependencies. However, current frameworks, such as Transformers and selective state-space models like Mambas, exhibit limitations in efficiently encoding spatial and temporal structures, particularly in scenarios requiring long-term high-dimensional sequence modelling. To address these issues, we propose a novel recurrent framework, the \textbf{FACT}ored \textbf{S}tate-space (\textbf{FACTS}) model, for spatial-temporal world modelling. The FACTS framework constructs a graph-structured memory with a routing mechanism that learns permutable memory representations, ensuring invariance to input permutations while adapting through selective state-space propagation. Furthermore, FACTS supports parallel computation of high-dimensional sequences. We empirically evaluate FACTS across diverse tasks, including multivariate time series forecasting, object-centric world modelling, and spatial-temporal graph prediction, demonstrating that it consistently outperforms or matches specialised state-of-the-art models, despite its general-purpose world modelling design."
  },


];

const scheduleData = {
  day1: [
    { time: "9:30 - 10:00", talk: "Workshop Introduction" },
    { time: "10:00 - 11:00", talk: "Federico Barbero: Why is Long-context Reasoning with LLMs Hard?", speakerKey: "Federico Barbero" },
    { time: "11:00 - 11:15", talk: "Coffee Break" },
    { time: "11:15 - 11:45", talk: "Sebastian Risi (online): Self-Organizing Intelligence: From Plastic Synapses to Continuous Thought", speakerKey: "Sebastian Risi (online)" },
    { time: "11:45 - 13:15", talk: "Lunch Break" },
    { time: "13:15 - 14:00", talk: "Jonas Hübotter (online): Towards Solving Hard Problems through Test-time Training", speakerKey: "Jonas Hübotter (online)" },
    { time: "14:00 - 14:45", talk: "Alicja Ziarko: Contrastive Representations for Combinatorial Reasoning", speakerKey: "Alicja Ziarko" },
    { time: "14:45 - 15:00", talk: "Coffee Break" },
    { time: "15:00 - 15:45", talk: "Core Francisco Park (online): New News: System-2 Fine-tuning for Robust Integration of New Knowledge", speakerKey: "Core Francisco Park (online)" },
    { time: "15:45 - 16:30", talk: "Tomáš Pajdla: Algebraic Structure of R-PolyNets Neural Networks", speakerKey: "Tomáš Pajdla" },

  ],
  day2: [
    { time: "10:00 - 11:00", talk: "Aryo Lotfi: Breaking Barriers to Global Reasoning Via Chain-of-Thought Methodologies", speakerKey: "Aryo Lotfi" },
    { time: "11:00 - 11:15", talk: "Coffee Break" },
    { time: "11:15 - 11:45", talk: "Mikoláš Janota: Introduction to Boolean Satisfiability and CDCL solvers", speakerKey: "Mikoláš Janota" },
    { time: "11:45 - 13:15", talk: "Lunch Break" },
    { time: "13:15 - 14:00", talk: "Vít Musil: Backpropagating through Combinatorial Solvers", speakerKey: "Vít Musil" },
    { time: "14:00 - 14:45", talk: "Witold Drzewakowski: Lightweight Latent Verifiers for Efficient Meta-Generation Strategies", speakerKey: "Witold Drzewakowski" },
    { time: "14:45 - 15:00", talk: "Coffee Break" },
    { time: "15:00 - 15:30", talk: "Naomi Saphra (online): You Know It Or You Don’t: Phase Transitions, Clustering, and Random Variation in Language Model Training", speakerKey: "Naomi Saphra (online)" },
    { time: "15:30 - 16:00", talk: "William T. Redman (online): Koopman Learning with Episodic Memory", speakerKey: "William T. Redman (online)" },
    {time: "18:00 - 20:00", talk: "Social Event"}
  ],
  day3: [
    { time: "10:00 - 11:00", talk: "Róbert Csordás: Towards Compositional Generalization and Latent Reasoning in Neural Networks", speakerKey: "Róbert Csordás" },
    { time: "11:00 - 11:15", talk: "Coffee Break" },
    { time: "11:15 - 11:45", talk: "Takeru Miyato (online): Artificial Kuramoto Oscillatory Neurons", speakerKey: "Takeru Miyato (online)"},
    { time: "11:45 - 13:15", talk: "Lunch Break" },
    { time: "13:15 - 14:00", talk: "Mirek Olšák: Looking for a Game", speakerKey: "Mirek Olšák"},
    { time: "14:00 - 14:45", talk: "Nanbo Li (online): FACTS: A Factored State-Space Framework For World Modelling", speakerKey: "Nanbo Li (online)"},
    { time: "14:45 - 15:00", talk: "Coffee Break" },
    { time: "15:00 - 15:45", talk: "Kazuki Irie (online): Incentives in Learning Machines", speakerKey: "Kazuki Irie (online)" },
    { time: "15:45 - 16:30", talk: "Gracjan Góral: What Matters in Hierarchical Search for Combinatorial Reasoning Problems?", speakerKey: "Gracjan Góral" },
    // { time: "15:30 - 16:00", talk: "Tomáš Pajdla", speakerKey: "Tomáš Pajdla" },
  ],
};


const speakerContainerStyle = {
  textAlign: 'center',
  //margin: '20px',
  //width: '150px', // Fixed width for each speaker item
};

const speakerImageStyle = {
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '10px',
  border: '3px solid #ddd',
  transition: 'transform 0.2s ease-in-out',
};

const speakerNameStyle = {
  marginTop: '8px',
  fontSize: '1.5em',
  fontWeight: '400',
  color: 'rgb(123 123 123)',
  marginBottom: '0px',
  lineHeight: '1',
};  

const speakerWorksStyle = {
  marginTop: '8px',
  fontSize: '1.3em',
  color: '#333',
};





const TimeSchedule = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const [selectedSpeakerData, setSelectedSpeakerData] = useState(null);

  const conferenceDays = [
    { key: 'day1', label: 'Day 1 (July 10)' },
    { key: 'day2', label: 'Day 2 (July 11)' },
    { key: 'day3', label: 'Day 3 (July 12)' },
  ];

  const tabButtonContainerStyle = {
    marginBottom: '1.5rem',
    textAlign: 'center',
  };

  const tabButtonStyle = (isActive) => ({
    padding: '10px 20px',
    margin: '0 5px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: isActive ? '3px solid #3273dc' : '3px solid transparent', // #3273dc is a common Bulma primary blue
    color: isActive ? '#3273dc' : '#4a4a4a', // Bulma default text color
    fontSize: '1.4em',
    fontWeight: isActive ? '600' : '400',
    transition: 'border-color 0.3s, color 0.3s',
  });

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    textAlign: 'left',
    padding: '12px 10px',
    borderBottom: '2px solid #363636', // Darker bottom border for table headers
    fontWeight: '600',
    fontSize: '1.05em',
  };

  const tdStyle = (isLastRow) => ({
    textAlign: 'left',
    padding: '10px 10px',
    borderBottom: isLastRow ? 'none' : '1px solid #dbdbdb', // Standard Bulma border color for horizontal lines
  });

  const handleSpeakerTalkClick = (speakerKey) => {
    const speaker = sampleSpeakers.find(s => s.name === speakerKey);
    if (speaker) {
      setSelectedSpeakerData(speaker);
    }
  };

  const closeModal = () => {
    setSelectedSpeakerData(null);
  };

  const clickableTalkStyle = {
    color: '#3273dc', // Bulma primary blue
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',
    textDecoration: 'underline',
    textAlign: 'left', // Ensure text aligns with other non-clickable talks
    fontSize: 'inherit', // Inherit font size from td
    fontFamily: 'inherit', // Inherit font family
  };

  // Modal Styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '85vh',
    overflowY: 'auto',
    textAlign: 'left',
    position: 'relative', // For close button positioning
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  const modalCloseButtonStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.8em',
    cursor: 'pointer',
    color: '#666',
  };

  const modalSpeakerImageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: '3px solid #ddd',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <div>
      <div style={tabButtonContainerStyle}>
        {conferenceDays.map(day => (
          <button
            key={day.key}
            onClick={() => setActiveDay(day.key)}
            style={tabButtonStyle(activeDay === day.key)}
          >
            {day.label}
          </button>
        ))}
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: '25%' }}>Time</th>
            <th style={thStyle}>Event</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData[activeDay].map((item, index, arr) => {
            const isLast = index === arr.length - 1;
            if (item.speakerKey) {
              return (
                <tr key={index}>
                  <td style={tdStyle(isLast)}>{item.time}</td>
                  <td style={tdStyle(isLast)}>
                    <button 
                      onClick={() => handleSpeakerTalkClick(item.speakerKey)}
                      style={clickableTalkStyle}
                    >
                      {item.talk}
                    </button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td style={tdStyle(isLast)}>{item.time}</td>
                  <td style={tdStyle(isLast)}>{item.talk}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      {selectedSpeakerData && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button style={modalCloseButtonStyle} onClick={closeModal}>&times;</button>
            <img src={selectedSpeakerData.image} alt={selectedSpeakerData.name} style={modalSpeakerImageStyle} />
            <h3 style={{ ...speakerNameStyle, textAlign: 'center', marginBottom: '5px' }}>{selectedSpeakerData.name}</h3>
            <p style={{ ...speakerWorksStyle, textAlign: 'center', fontSize: '1.1em', marginBottom: '15px' }}>{selectedSpeakerData.works}</p>
            <h4 style={{ marginTop: '20px', marginBottom: '8px', color: '#333', fontSize: '1.2em', fontWeight: '600' }}>{selectedSpeakerData.title}</h4>
            <p style={{ fontSize: '1em', lineHeight: '1.6', color: '#4a4a4a' }}>{selectedSpeakerData.abstract}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  datum,
  mainpitch,
  description,
  intro,
  speakers,
}) => {
  const heroImage = getImage(image) || image;
  const descStyle = {
    fontSize: '1.5em',
    fontWeight: '400',
    lineHeight: '1.6',
    textAlign: 'center',
  }
  return (
    <div>
      <FullWidthImage img={heroImage} title={title} subheading={subheading} datum={datum} />
      <section className="section section--gradient">
        <div>
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="content">

                    <div className="tile">
                      <h3 className="subtitle" style={descStyle}>{mainpitch.description}</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center' }}>
                        <a id="speakers">{"Invited Speakers"}</a>
                      </h3>
                      
                    </div>
                  </div>
                  <Speakers speakers={speakers} />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2.5rem' }}>
                  <a id="program" href="#program">{"Workshop Program"}</a>
                </h3>
                <TimeSchedule />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ padding: '0px' }}>
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <a id="location" href="#location">{"Location"}</a>
                      </h3>
                      <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.4em' }}>Jugoslávských partyzánů 1580/3, 160 00 Dejvice, Penthouse, Building A, 10th floor (There will be a sign at the entrance)</p>
                      <div className="map-container" style={{ 
                          width: 'calc(100% + 1.5rem)', /* Expand width to cover column padding */
                          marginLeft: '-0.75rem',       /* Offset to the left by column padding */
                          marginRight: '-0.75rem',      /* Offset to the right by column padding */
                          height: '500px', 
                          marginTop: '2rem'             /* Preserve existing margin-top */
                        }}>
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.120683199204!2d14.389829498243165!3d50.10274803892883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f1543cd64f%3A0x86719e9058705de4!2s%C4%8Cesk%C3%BD%20institut%20informatiky%2C%20robotiky%20a%20kybernetiky%2C%20%C4%8CVUT%20v%20Praze%20(CIIRC)!5e0!3m2!1scs!2scz!4v1747607689901!5m2!1scs!2scz"
                          width="100%" 
                          height="100%" 
                          style={{ border: 0, display: 'block' }} /* Add display: 'block' */
                          allowFullScreen="" 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Conference Location"
                        ></iframe>
                      </div>
                    </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center', marginTop: '3rem' }}>
                <a id="participate" href="#participate">{"Participate"}</a>
              </h3>
              <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.4em' }}>
              There are no more empty seats. Looking forward to seeing you next year.
                {/* The workshop is in-person only and free of charge. There are about 50 seats for people who wish to attend the talks. 
                If you are interested in participating, please fill <a href="http://docs.google.com/forms/d/e/1FAIpQLSfWr_5Os_C0q1DML3-vrU_FBc9kPAxNMJ475GGG0O72L7IBmA/viewform">this form</a> or contact us at <a href="mailto:praguesynapse@gmail.com">praguesynapse@gmail.com</a>.
     */}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ marginTop: '0px', paddingTop: '0px' }}>
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2" style={{ textAlign: 'center' }}>
                <a id="organizers" href="#organizers">{"Organizers"}</a>
              </h3>
              <div className="columns is-multiline is-centered" style={{ marginTop: '2rem' }}>
              <div
                className="column is-one-quarter-desktop is-one-quarter-tablet"
                style={speakerContainerStyle}
              >
                <StaticImage
                  src={"../img/organizers/jansq.jpg"}
                  alt={"Jan"}
                  width={200}
                  height={200}
                  objectFit="cover"
                  style={{
                    borderRadius: '50%',
                    border: '3px solid #ddd',
                    transition: 'transform 0.2s ease-in-out',
                    marginBottom: '10px',
                  }}
                />  
                <p style={speakerNameStyle}>{"Jan Hůla"}</p>
              </div>
              <div
                  className="column is-one-quarter-desktop is-one-quarter-tablet"
                style={speakerContainerStyle}
              >
                <StaticImage
                  src={"../img/organizers/Frantisek.jpg"}
                  alt={"Frantisek"}
                  width={200}
                  height={200}
                  objectFit="cover"
                  style={{
                    borderRadius: '50%',
                    border: '3px solid #ddd',
                    transition: 'transform 0.2s ease-in-out',
                    marginBottom: '10px',
                  }}
                />  
                <p style={speakerNameStyle}>{"František Koutenský"}</p>
              </div>
              <div
                  className="column is-one-quarter-desktop is-one-quarter-tablet"
                style={speakerContainerStyle}
              >
                <StaticImage
                  src={"../img/organizers/petr.jpg"}
                  alt={"Petr"}
                  width={200}
                  height={200}
                  objectFit="cover"
                  style={{
                    borderRadius: '50%',
                    border: '3px solid #ddd',
                    transition: 'transform 0.2s ease-in-out',
                    marginBottom: '10px',
                  }}
                />  
                <p style={speakerNameStyle}>{"Petr Hyner"}</p>
              </div>

              </div>
            </div>
          </div>
          <div className="columns is-centered is-vcentered">
            <div className="column is-one-quarter-desktop has-text-centered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StaticImage
                  src={"../img/organizers/eu.png"}
                  alt={"eu"}
                  width={200}
                />  
            </div>
            <div className="column is-one-quarter-desktop has-text-centered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StaticImage
                  src={"../img/organizers/npo.png"}
                  alt={"npo"}
                  width={200}
                />  
            </div>
            <div className="column is-one-quarter-desktop has-text-centered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StaticImage
                  src={"../img/organizers/mpo.png"}
                  alt={"mpo"}
                  width={160}
                />  
            </div>
            <div className="column is-one-quarter-desktop has-text-centered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StaticImage
                  src={"../img/organizers/eucz.jpg"}
                  alt={"eucz"}
                  width={160}
                />  
            </div>
            <div className="column is-one-quarter-desktop has-text-centered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StaticImage
                  src={"../img/organizers/msmt.jpg"}
                  alt={"msmt"}
                  width={160}
                />  
            </div>
            <div className="column is-one-quarter-desktop has-text-centered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StaticImage
                  src={"../img/organizers/logo_CIIRC_en.svg"}
                  alt={"ciirc"}
                  width={160}
                />  
            </div>
            <div className="column is-one-quarter-desktop has-text-centered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StaticImage
                  src={"../img/organizers/OSTRAVSKA-UNIVERZITA.png"}
                  alt={"ciirc"}
                  width={100}
                />  
            </div>
          </div>
        </div>
        <div><p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2em' }}>Financováno z projektu Biografie dezinformace s přívlastkem AI: Rizikový fenomén prizmatem moderních věd o člověku - CZ.02.01.01/00/23_025/000872</p></div>

      </section>
      
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  datum: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  speakers: PropTypes.array,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        datum={frontmatter.datum}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        speakers={sampleSpeakers}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        datum
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
