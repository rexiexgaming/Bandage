/*
  Bandage Exams - local exam data (no database needed).

  To add another exam, copy one object inside window.BANDAGE_EXAMS and change it.
  Questions use the same block format as before, separated by a line with ---

    LECTURE: Lecture name
    QUESTION: Question text?
    A: First choice
    B: Second choice
    C: Third choice
    D: Fourth choice
    ANSWER: B
    EXPLANATION: (optional)
    IMAGE_URL: (optional)
*/
window.BANDAGE_EXAMS = [
  {
    id: 'mu43-final',
    title: 'MU43 FINAL',
    description: 'Final PMS 2025-2026',
    durationMinutes: 25,
    authorName: 'Bandage',
    authorInfo: 'Faculty of Medicine',
    questions: `
LECTURE: Epithelium & Glands
QUESTION: The epithelium that lines the fallopian tube is:
A: columnar ciliated
B: Stratified cuboidal
C: Stratified squamous non-keratinized
D: Pseudostratified columnar
ANSWER: A
---
LECTURE: Epithelium & Glands
QUESTION: A mixed gland is a gland located at:
A: heart
B: pancreas
C: Has serous and mucous acini
D: Has no ducts
ANSWER: B
---
LECTURE: Epithelium & Glands
QUESTION: Its secretory unit is flask-shaped:
A: alveolar acinus
B: tubular acinus
C: Serous demilune
D: Goblet cell
ANSWER: A
---
LECTURE: Epithelium & Glands
QUESTION: Desmosomes are mainly present in:
A: Smooth muscle
B: Cardiac muscle
C: Skeletal muscle
D: Neurons
ANSWER: B
---
LECTURE: Epithelium & Glands
QUESTION: A brush border on the apical surface of absorptive cells is formed of:
A: Cilia
B: Stereocilia
C: Microvilli
D: Flagella
ANSWER: C
---
LECTURE: Connective Tissue
QUESTION: Reticular fibers consist of which collagen type?
A: Type I
B: Type II
C: Type III
D: Type IV
ANSWER: C
---
LECTURE: Connective Tissue
QUESTION: The cell primarily responsible for wound healing is:
A: Mast cell
B: Fibroblast
C: Macrophage
D: Plasma cell
ANSWER: B
---
LECTURE: Connective Tissue
QUESTION: A cell with acidophilic cytoplasm, indented nucleus, and lysosomes is:
A: Plasma cell
B: Macrophage
C: Fibroblast
D: Mast cell
ANSWER: B
---
LECTURE: Connective Tissue
QUESTION: Irregular dense fibrous connective tissue is present in:
A: Tendon
B: Dermis
C: Ligament
D: Perimysium
ANSWER: B
---
LECTURE: Cartilage & Bone
QUESTION: Elastic fibers could be found in:
A: Ear pinna
B: Intervertebral disc
C: Epiphyseal plate
D: Fibrocartilage
ANSWER: A
---
LECTURE: Cartilage & Bone
QUESTION: The inner cellular layer of periosteum contains:
A: Osteoclasts
B: Osteocytes
C: Osteogenic cells
D: Chondroblasts
ANSWER: C
---
LECTURE: Cartilage & Bone
QUESTION: Sharpey’s fibers are:
A: Elastic fibers
B: Reticular fibers
C: Collagen fibers
D: Microtubules
ANSWER: C
---
LECTURE: Embryology
QUESTION: The vitellointestinal duct connects the:
A: Foregut and primitive yolk sac
B: Midgut and definitive yolk sac
C: Hindgut and secondary yolk sac
D: Midgut and amniotic cavity
ANSWER: B
---
LECTURE: Embryology
QUESTION: Sex of the embryo is determined at:
A: 2-cell stage
B: Formation of embryonic disc
C: Fertilization
D: Gastrulation
ANSWER: C
---
LECTURE: Embryology
QUESTION: Completion of the 2nd meiotic division of the oocyte occurs during:
A: Ovulation
B: Implantation
C: Fertilization
D: Cleavage division
ANSWER: C
---
LECTURE: Embryology
QUESTION: By the end of the first week, the main event is:
A: Gastrulation
B: Implantation begins
C: Neurulation
D: Formation of chorionic villi
ANSWER: B
---
LECTURE: Embryology
QUESTION: The ectopic pregnancy with the highest incidence is:
A: Cervical
B: Abdominal
C: fallopian tube
D: Ovarian
ANSWER: C
---
LECTURE: Embryology
QUESTION: The floor of the yolk sac is derived from:
A: Hypoblast
B: Epiblast
C: Extraembryonic mesoderm
D: Cytotrophoblast
ANSWER: A
---
LECTURE: Embryology
QUESTION: Secondary villi consist of:
A: Cytotrophoblast only
B: Syncytiotrophoblast + cytotrophoblast
C: Trophoblast + extraembryonic mesoderm
D: Trophoblast + fetal vessels
ANSWER: C
---
LECTURE: Embryology
QUESTION: The mouth vestibule develops from:
A: Endoderm
B: Mesoderm
C: Surface ectoderm
D: Neural crest
ANSWER: C
---
LECTURE: Embryology
QUESTION: Two-thirds of all twins are:
A: Monochorionic monoamniotic
B: Monochorionic diamniotic
C: Dizygotic
D: Conjoined
ANSWER: C
---
LECTURE: Embryology
QUESTION: Chorionic villi facing decidua capsularis form the:
A: Chorion frondosum
B: Chorion laeve
C: Amnion
D: Chorionic cavity
ANSWER: B
---
LECTURE: Cartilage & Bone
QUESTION: The cell located in the osteogenic inner layer of periosteum is:
A: Osteocyte
B: Osteoblast precursor
C: Osteoclast
D: Chondrocyte
ANSWER: B
---
LECTURE: Cartilage & Bone
QUESTION: Primary ossification centers appear in the limb bones at:
A: 6th week
B: 8th week
C: 10th week
D: 12th week
ANSWER: B
---
LECTURE: Urinary System
QUESTION: The ureter normally has how many constrictions?
A: 1
B: 2
C: 3
D: 4
ANSWER: C
`
  },
  {
    id: 'bandage-exam',
    title: 'bandage exam',
    description: 'Anatomy, Embryology & Histology',
    durationMinutes: 74,
    authorName: 'Bandage',
    authorInfo: 'Faculty of Medicine',
    questions: `
LECTURE: Anatomy
QUESTION: Which part of the brain is primarily responsible for coordination of voluntary movements and maintenance of equilibrium?
A: Cerebrum
B: Medulla oblongata
C: Cerebellum
D: Spinal cord
ANSWER: C
---
LECTURE: Anatomy
QUESTION: What is the structural and functional unit of the nervous system?
A: Axon
B: Neuron
C: Synapse
D: Dendrite
ANSWER: B
---
LECTURE: Anatomy
QUESTION: Which structure forms the most inferior part of the brainstem?
A: Midbrain
B: Pons
C: Cerebellum
D: Medulla oblongata
ANSWER: D
---
LECTURE: Anatomy
QUESTION: Which cranial nerve supplies motor innervation to most muscles of the pharynx and larynx?
A: Glossopharyngeal nerve
B: Hypoglossal nerve
C: Vagus nerve
D: Accessory nerve
ANSWER: C
---
LECTURE: Anatomy
QUESTION: How many pairs of spinal nerves are present in humans?
A: 12 pairs
B: 24 pairs
C: 31 pairs
D: 33 pairs
ANSWER: C
---
LECTURE: Anatomy
QUESTION: What are the raised folds on the surface of the cerebral cortex called?
A: Sulci
B: Gyri
C: Fissures
D: Ventricles
ANSWER: B
---
LECTURE: Anatomy
QUESTION: What type of epithelium lines the uterine tube?
A: Simple cuboidal
B: Stratified squamous
C: Pseudostratified columnar
D: Simple columnar with ciliated cells
ANSWER: D
---
LECTURE: Anatomy
QUESTION: Which organelle is especially abundant in the middle piece of a mature spermatozoon?
A: Lysosomes
B: Mitochondria
C: Golgi apparatus
D: Nucleus
ANSWER: B
---
LECTURE: Anatomy
QUESTION: What is the most common site of ectopic pregnancy?
A: Cervix
B: Ovary
C: Ampulla of uterine tube
D: Abdominal cavity
ANSWER: C
---
LECTURE: Anatomy
QUESTION: What is the name of the dense fibrous capsule surrounding the testis?
A: Tunica vaginalis
B: Tunica albuginea
C: Dartos fascia
D: Cremasteric fascia
ANSWER: B
---
LECTURE: Anatomy
QUESTION: Which layer of the uterine wall consists predominantly of smooth muscle?
A: Endometrium
B: Perimetrium
C: Myometrium
D: Stratum basalis
ANSWER: C
---
LECTURE: Anatomy
QUESTION: Which duct begins as a continuation of the tail of the epididymis?
A: Ureter
B: Ejaculatory duct
C: Urethra
D: Vas deferens
ANSWER: D
---
LECTURE: Embryology
QUESTION: Where does spermatogenesis occur?
A: Rete testis
B: Seminiferous tubules
C: Epididymis
D: Vas deferens
ANSWER: B
---
LECTURE: Embryology
QUESTION: Which process transforms spermatogonia into mature spermatozoa?
A: Oogenesis
B: Capacitation
C: Spermatogenesis
D: Fertilization
ANSWER: C
---
LECTURE: Embryology
QUESTION: Which germ cell is the largest within the seminiferous epithelium?
A: Spermatogonium
B: Spermatid
C: Secondary spermatocyte
D: Primary spermatocyte
ANSWER: D
---
LECTURE: Embryology
QUESTION: Which event triggers completion of meiosis II in the secondary oocyte?
A: Ovulation
B: Implantation
C: Sperm penetration during fertilization
D: Menstruation
ANSWER: C
---
LECTURE: Embryology
QUESTION: In which stage of meiosis are primary oocytes arrested at birth?
A: Metaphase II
B: Prophase I
C: Anaphase I
D: Telophase II
ANSWER: B
---
LECTURE: Embryology
QUESTION: Which pituitary hormones regulate the ovarian cycle?
A: Estrogen and progesterone
B: Prolactin and oxytocin
C: FSH and LH
D: hCG and hPL
ANSWER: C
---
LECTURE: Embryology
QUESTION: What structure forms from the corpus luteum after its regression?
A: Corpus albicans
B: Graafian follicle
C: Primary follicle
D: Zona pellucida
ANSWER: A
---
LECTURE: Embryology
QUESTION: In which part of the uterine tube does fertilization normally occur?
A: Isthmus
B: Infundibulum
C: Intramural part
D: Ampulla
ANSWER: D
---
LECTURE: Embryology
QUESTION: At which event is the chromosomal sex of the embryo determined?
A: Implantation
B: Fertilization
C: Gastrulation
D: Birth
ANSWER: B
---
LECTURE: Embryology
QUESTION: What is the process of repeated mitotic divisions of the zygote without an increase in its overall size?
A: Gastrulation
B: Implantation
C: Cleavage
D: Neurulation
ANSWER: C
---
LECTURE: Embryology
QUESTION: What is the solid embryonic cell mass formed at approximately the 16-cell stage called?
A: Blastocyst
B: Morula
C: Bilaminar disc
D: Gastrula
ANSWER: B
---
LECTURE: Embryology
QUESTION: What is the early embryonic structure containing an internal fluid-filled cavity called?
A: Morula
B: Zygote
C: Blastocyst
D: Primitive streak
ANSWER: C
---
LECTURE: Embryology
QUESTION: Which cell population of the blastocyst gives rise to the embryo proper?
A: Trophoblast
B: Syncytiotrophoblast
C: Cytotrophoblast
D: Embryoblast
ANSWER: D
---
LECTURE: Embryology
QUESTION: What is the normal site of implantation within the uterus?
A: Cervical canal
B: Upper part of uterine body, usually posterior wall
C: Lower uterine segment
D: Uterine tube
ANSWER: B
---
LECTURE: Embryology
QUESTION: Which endometrial layer is shed during menstruation?
A: Stratum basalis
B: Myometrium
C: Stratum functionalis
D: Perimetrium
ANSWER: C
---
LECTURE: Embryology
QUESTION: Which trophoblastic layer secretes human chorionic gonadotropin (hCG)?
A: Cytotrophoblast
B: Embryoblast
C: Hypoblast
D: Syncytiotrophoblast
ANSWER: D
---
LECTURE: Embryology
QUESTION: Which temporary duct connects the embryonic midgut to the definitive yolk sac?
A: Allantois
B: Vitellointestinal duct
C: Neurenteric canal
D: Urachus
ANSWER: B
---
LECTURE: Embryology
QUESTION: What is the temporary communication between the amniotic cavity and yolk sac during notochord development called?
A: Neural canal
B: Vitelline duct
C: Neurenteric canal
D: Chorionic cavity
ANSWER: C
---
LECTURE: Embryology
QUESTION: What is the process of forming the trilaminar embryonic disc called?
A: Cleavage
B: Gastrulation
C: Implantation
D: Fertilization
ANSWER: B
---
LECTURE: Embryology
QUESTION: Which embryonic structure gives rise to the nucleus pulposus of the intervertebral disc?
A: Neural tube
B: Somite
C: Notochord
D: Neural crest
ANSWER: C
---
LECTURE: Embryology
QUESTION: What is the name of the maternal-blood-filled spaces appearing within the syncytiotrophoblast during implantation?
A: Amniotic cavities
B: Trophoblastic lacunae
C: Neural grooves
D: Somites
ANSWER: B
---
LECTURE: Embryology
QUESTION: Which type of chorionic villus contains fetal blood capillaries?
A: Primary villus
B: Secondary villus
C: Tertiary villus
D: Primary stem villus without vessels
ANSWER: C
---
LECTURE: Embryology
QUESTION: Which germ layer gives rise to the neural crest?
A: Endoderm
B: Mesoderm
C: Ectoderm
D: Extraembryonic mesoderm
ANSWER: C
---
LECTURE: Embryology
QUESTION: Which embryonic mesodermal subdivision forms the somites?
A: Intermediate mesoderm
B: Paraxial mesoderm
C: Lateral plate mesoderm
D: Extraembryonic mesoderm
ANSWER: B
---
LECTURE: Embryology
QUESTION: Which mesodermal subdivision gives rise to most of the kidneys and gonads?
A: Paraxial mesoderm
B: Lateral plate mesoderm
C: Intermediate mesoderm
D: Extraembryonic mesoderm
ANSWER: C
---
LECTURE: Embryology
QUESTION: During which embryonic week does body folding occur predominantly?
A: Second week
B: Third week
C: Fourth week
D: Eighth week
ANSWER: C
---
LECTURE: Embryology
QUESTION: What congenital defect results from failure of the physiological midgut hernia to return to the abdominal cavity?
A: Gastroschisis
B: Omphalocele
C: Umbilical granuloma
D: True knot of umbilical cord
ANSWER: B
---
LECTURE: Histology
QUESTION: Which type of epithelium normally lines the urinary bladder?
A: Simple squamous
B: Stratified cuboidal
C: Transitional epithelium
D: Pseudostratified columnar
ANSWER: C
---
LECTURE: Histology
QUESTION: Which type of epithelium lines most of the trachea?
A: Simple squamous
B: Pseudostratified ciliated columnar
C: Stratified squamous keratinized
D: Simple cuboidal
ANSWER: B
---
LECTURE: Histology
QUESTION: Which type of epithelium lines the pulmonary alveoli predominantly?
A: Simple squamous
B: Simple cuboidal
C: Stratified squamous
D: Transitional
ANSWER: A
---
LECTURE: Histology
QUESTION: Which type of epithelium lines most renal tubules?
A: Stratified columnar
B: Simple squamous
C: Simple cuboidal
D: Pseudostratified ciliated
ANSWER: C
---
LECTURE: Histology
QUESTION: Which type of epithelium forms the epidermis?
A: Nonkeratinized stratified squamous
B: Simple columnar
C: Transitional
D: Keratinized stratified squamous
ANSWER: D
---
LECTURE: Histology
QUESTION: Which apical cell-surface modification increases the absorptive surface area of intestinal epithelial cells?
A: Cilia
B: Microvilli
C: Desmosomes
D: Hemidesmosomes
ANSWER: B
---
LECTURE: Histology
QUESTION: Which cytoskeletal filaments form the core of motile cilia?
A: Actin microfilaments
B: Intermediate filaments
C: Microtubules
D: Collagen fibrils
ANSWER: C
---
LECTURE: Histology
QUESTION: Which organelle forms the basal body of a cilium?
A: Lysosome
B: Centriole
C: Ribosome
D: Mitochondrion
ANSWER: B
---
LECTURE: Histology
QUESTION: What are the long, nonmotile, actin-based projections found on epididymal epithelial cells called?
A: Motile cilia
B: Flagella
C: Stereocilia
D: Basal infoldings
ANSWER: C
---
LECTURE: Histology
QUESTION: Which cell junction allows direct passage of ions and small molecules between adjacent cells?
A: Tight junction
B: Desmosome
C: Hemidesmosome
D: Gap junction
ANSWER: D
---
LECTURE: Histology
QUESTION: Where is Wharton's jelly found?
A: Bone marrow
B: Umbilical cord
C: Articular cartilage
D: Dermis
ANSWER: B
---
LECTURE: Histology
QUESTION: Which connective tissue cell is primarily responsible for synthesizing collagen and ground substance?
A: Mast cell
B: Macrophage
C: Fibroblast
D: Plasma cell
ANSWER: C
---
LECTURE: Histology
QUESTION: Which connective tissue cell has high-affinity IgE receptors and releases histamine during immediate allergic reactions?
A: Fibroblast
B: Mast cell
C: Adipocyte
D: Osteoblast
ANSWER: B
---
LECTURE: Histology
QUESTION: Which type of collagen is the principal component of reticular fibers?
A: Type I
B: Type II
C: Type III
D: Type IV
ANSWER: C
---
LECTURE: Histology
QUESTION: Which stain is commonly used to demonstrate elastic fibers?
A: Hematoxylin
B: Orcein
C: Periodic acid–Schiff
D: Prussian blue
ANSWER: B
---
LECTURE: Histology
QUESTION: Which circulating leukocytes can differentiate into macrophages after entering inflamed tissues?
A: Erythrocytes
B: Basophils
C: Monocytes
D: Platelets
ANSWER: C
---
LECTURE: Histology
QUESTION: Which connective tissue cell typically has an eccentric nucleus with clock-face chromatin?
A: Fibroblast
B: Plasma cell
C: Mast cell
D: Neutrophil
ANSWER: B
---
LECTURE: Histology
QUESTION: Which type of connective tissue forms most tendons?
A: Loose areolar
B: Dense irregular
C: Reticular
D: Dense regular collagenous
ANSWER: D
---
LECTURE: Histology
QUESTION: Which type of collagen predominates in hyaline cartilage?
A: Type I
B: Type II
C: Type III
D: Type IV
ANSWER: B
---
LECTURE: Histology
QUESTION: Which type of collagen predominates in the organic matrix of bone?
A: Type I
B: Type II
C: Type III
D: Type IV
ANSWER: A
---
LECTURE: Histology
QUESTION: Which type of connective tissue forms the stroma of many lymphoid organs?
A: Adipose
B: Dense regular
C: Reticular
D: Elastic
ANSWER: C
---
LECTURE: Histology
QUESTION: Which specialized connective tissue cells contract the edges of a wound during healing?
A: Plasma cells
B: Myofibroblasts
C: Chondrocytes
D: Osteoclasts
ANSWER: B
---
LECTURE: Histology
QUESTION: Which type of cartilage forms the fibrocartilaginous portion of an intervertebral disc?
A: Elastic cartilage
B: Hyaline cartilage
C: Fibrocartilage
D: Calcified articular cartilage
ANSWER: C
---
LECTURE: Histology
QUESTION: Which mature cartilage cell is found within a lacuna?
A: Chondroblast
B: Osteoblast
C: Fibroblast
D: Chondrocyte
ANSWER: D
---
LECTURE: Histology
QUESTION: Which cartilage-forming cell is responsible for appositional growth?
A: Chondroblast
B: Osteoclast
C: Osteocyte
D: Macrophage
ANSWER: A
---
LECTURE: Histology
QUESTION: What is the growth of cartilage by addition of new matrix at its surface called?
A: Interstitial growth
B: Appositional growth
C: Endochondral ossification
D: Intramembranous ossification
ANSWER: B
---
LECTURE: Histology
QUESTION: Which property of cartilage contributes most directly to its poor healing capacity?
A: Rich vascular supply
B: High innervation
C: Avascularity
D: Rapid cell turnover
ANSWER: C
---
LECTURE: Histology
QUESTION: Which type of cartilage covers the articular surfaces of most synovial joints?
A: Elastic cartilage
B: Fibrocartilage
C: Hyaline cartilage
D: Reticular tissue
ANSWER: C
---
LECTURE: Histology
QUESTION: Which connective tissue covering is absent from articular cartilage?
A: Endosteum
B: Periosteum
C: Perichondrium
D: Epimysium
ANSWER: C
---
LECTURE: Histology
QUESTION: Which bone cell is found in Howship's lacuna?
A: Osteoblast
B: Osteocyte
C: Chondrocyte
D: Osteoclast
ANSWER: D
---
LECTURE: Histology
QUESTION: Which bone cell is primarily responsible for synthesizing osteoid?
A: Osteoclast
B: Osteoblast
C: Osteocyte
D: Chondrocyte
ANSWER: B
---
LECTURE: Histology
QUESTION: What is the basic structural unit of mature compact bone?
A: Trabecula
B: Osteon
C: Lacuna
D: Canaliculus
ANSWER: B
---
LECTURE: Histology
QUESTION: Through which microscopic channels do osteocyte processes extend within mineralized bone?
A: Haversian canals
B: Volkmann canals
C: Canaliculi
D: Marrow sinusoids
ANSWER: C
---
LECTURE: Histology
QUESTION: Which type of ossification directly forms many flat bones of the cranial vault?
A: Endochondral ossification
B: Intramembranous ossification
C: Interstitial cartilage growth
D: Appositional cartilage growth
ANSWER: B
---
LECTURE: Histology
QUESTION: Which type of cartilage growth occurs within the epiphyseal growth plate and contributes to longitudinal growth of long bones?
A: Appositional growth
B: Interstitial growth
C: Perichondrial fibrosis
D: Intramembranous ossification
ANSWER: B
`
  }
];
