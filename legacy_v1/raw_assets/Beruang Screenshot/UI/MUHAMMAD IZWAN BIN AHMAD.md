~~__~~ 



<!-- Start of picture text -->
!<br>I<br>I<br>I<br>UNIVERSITI<br><<br>I TEKNOLOGI fr<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>II ee EE<br>I<br>I<br>I<br>I<br>I Se<br>I<br>I<br>I<br>I ee<br>I<br>I<br>I<br>I<br>I eee<br>I<br>I<br>I1 eee<br>I<br>I<br>I a<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I ee<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>1 a<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>I<br>|<br><!-- End of picture text -->

~~__~~ 

## **UNIVERSITI TEKNOLOGI MARA** 

# **BERUANG: MONEY MANAGEMENT MOBILE APPLICATION WITH PERSONAL FINANCING CHATBOT** 

## **MUHAMMAD IZWAN BIN AHMAD** 

## **BACHELOR OF COMPUTER SCIENCE (HONS.)** 

**JANUARY 2026** 

# **Universiti Teknologi MARA** 

# **Beruang: Money Management Mobile Application with Personal Financing Chatbot** 

## **Muhammad Izwan bin Ahmad** 

**Thesis submitted in fulfilment of the requirement for Bachelor of Computer Science (Hons.) Faculty of Computer and Mathematical Science** 

**January 2026** 

ii 

## **SUPERVISOR APPROVAL** 

### **BERUANG: MONEY MANAGEMENT MOBILE APPLICATION WITH AI PERSONAL FINANCING CHATBOT** 

By 

### **MUHAMMAD IZWAN BIN AHMAD** 

### **2024938885** 

This thesis was prepared under the supervision of the project supervisor, Dr. Khairulliza binti Ahmad Salleh. It was submitted to the Faculty of Computer and Mathematical Science and was accepted in partial fulfilment of the requirements for the degree of Bachelor of Computer Science (Hons.). 

Approved by 



…………………………….. 

Dr. Khairulliza binti Ahmad Salleh 

Project Supervisor 

JANUARY 29, 2026 

iii 

## **STUDENT DECLARATION** 

I certify that this thesis and the project to which it refers is the product of my own work and that any idea or quotation from the work of other people, published or otherwise are fully acknowledged in accordance with the standard referring practices of the discipline. 



<!-- Start of picture text -->
……………………………..<br><!-- End of picture text -->

MUHAMMAD IZWAN BIN AHMAD 

2024938885 

JANUARY 29, 2026 

iv 

## **ACKNOWLEDGEMENT** 

Alhamdulillah, all praises to Allah SWT for granting me the strength to complete this Final Year Project. I express my deepest gratitude to my supervisor, Dr. Khairulliza binti Ahmad Salleh, for her invaluable guidance, insightful feedback, and unwavering support throughout the development of Beruang: Money Management Mobile Application with Personal Financing Chatbot. Her expertise and mentorship were instrumental in shaping this research and ensuring the project achieved its objectives with technical rigor. My sincere appreciation extends to the Faculty of Computer and Mathematical Science, Universiti Teknologi MARA, for providing essential facilities and resources that enabled me to conduct this study. I am eternally grateful to my parents and family for their endless love, prayers, and unwavering financial and emotional support throughout my academic journey. Their encouragement kept me motivated during challenging phases of system development, machine learning model training, and documentation. Special thanks to my friends for their continuous encouragement and constructive discussions that helped refine this project. I also extend my heartfelt appreciation to the 55 respondents who participated in the User Acceptance Testing phase. Your honest feedback and willingness to test the application were instrumental in evaluating the success and usability of this very project. Thank you. 

v 

## **ABSTRACT** 

Young adults aged 18 to 30 in Malaysia face significant challenges in managing their personal finances due to limited financial literacy and restricted access to affordable professional advisory services. This study addresses this gap by developing Beruang, a comprehensive money management mobile application integrated with an AIpowered personal financing chatbot designed to foster better financial habits. The project adopts the Machine Learning Life Cycle methodology to construct a Hybrid Multi-Model AI Architecture that balances on-device performance with cloud-based intelligence. The system employs a local Bidirectional Long Short-Term Memory (BiLSTM) model for transaction classification according to the 50/30/20 budgeting rule and a MiniLM transformer for intent routing. Cloud-based components include Google Gemini 2.5 Flash for automated receipt scanning and xAI Grok 4.1 Fast for generating context-aware financial advice. A Retrieval-Augmented Generation (RAG) pipeline enhances the chatbot by injecting real-time user budget states, expert financial tips, and localized Malaysian economic data from the Department of Statistics Malaysia to ensure personalized guidance. Technical evaluation demonstrated that the Bi-LSTM model achieved 99.61% transaction classification accuracy while the MiniLM intent classifier reached 99.62% accuracy. The application features a gamified evolution system to motivate consistent tracking habits within a responsive 13-screen React Native interface. User Acceptance Testing with 55 respondents yielded a System Usability Scale score of 86.77, indicating excellent usability, with 98.2% of users reporting increased confidence in managing their finances. This project successfully delivers a robust and accessible financial tool that leverages hybrid artificial intelligence to empower young adults with the knowledge and discipline needed for long-term financial well-being. 

vi 

## **TABLE OF CONTENTS** 

|**CON**|**TENT**<br>**PAGE**|
|---|---|
|**SUPE**|**RVISOR APPROVAL**<br>iii|
|**STUD**|**ENT DECLARATION**<br>iv|
|**LIST**|**OF FIGURES**<br>xi|
|**LIST**|**OF TABLES**<br>xiii|
|**LIST**|**OF ABBREVIATIONS**<br>xiv|
|**CHAP**|**TER 1: INTRODUCTION**<br>1|
|1.1|Background of Study<br>1|
|1.2|Problem Statement<br>3|
|1.3|Project Objective<br>4|
|1.4|Scope of Study<br>5|
|1.5|Significance of Study<br>6|
|1.6|Conclusion<br>7|
|**CHAP**|**TER 2: LITERATURE REVIEW**<br>9|
|2.1|Introduction<br>9|
|2.2|Overview of Finance<br>10|
|2.|2.1 Personal Finance<br>11|
|2.|2.2 Savings<br>14|
|2.|2.3 Budgeting<br>15|
|2.|2.4 Expense Tracking<br>17|
|2.3|Overview of Machine Learning<br>18|
|2.|3.1 Natural Language Processing<br>20|
|2.|3.2 Supervised Learning<br>23|
|2.|3.3 Transformers Model<br>24|



vii 

|2.3.4 Application of NLP|27|
|---|---|
|2.3.5 Deep Learning|30|
|2.3.6 Multimodal Artificial Intelligence|30|
|2.4<br>Comparison of Existing Applications|31|
|2.4.1 Android-Based Personal Finance Tool|32|
|2.4.2 Machine Learning Financial App|33|
|2.4.3 Financially App|34|
|2.5<br>Justification on Selected NLP Application and Transformer Model|37|
|2.6<br>Conclusion|39|
|**CHAPTER 3: METHODOLOGY**|40|
|3.1<br>Introduction|40|
|3.2<br>Project Methodology|40|
|3.2.1 Model Requirements Analysis|41|
|3.2.2 Data Collection & Preprocessing|44|
|3.2.3 Model Selection & Training|45|
|3.2.4 Application Design & Development|48|
|3.2.5 Integration & Testing|50|
|3.2.6 Usability Evaluation|52|
|3.2.7 Deployment & Monitoring|53|
|3.3<br>Summary of Project Methodology|54|
|3.4<br>System Architecture|57|
|3.5<br>Hardware & Software Requirement|60|
|3.5.1 Hardware Requirement|60|
|3.5.2 Software Requirement|61|
|3.6<br>Conclusion|63|
|**CHAPTER 4: PROJECT DESIGN, IMPLEMENTATION AND RESULT**|64|
|4.1<br>Introduction|64|
|4.2<br>System Design|64|
|4.2.1<br>System Screen Flow Diagram|65|



viii 

|4.2.2|User Interaction Storyboard|66|
|---|---|---|
|4.2.3|Use Case Diagram|67|
|4.2.4|System Flowchart|69|
|4.2.5|Entity-Relationship Diagram (ERD)|71|
|4.2.6|AI Model Integration|72|
|4.3<br>Sy|stem Development: AI & Backend Services|73|
|4.3.1|Development Environment & Tech Stack|73|
|4.3.2|Data Preparation and Preprocessing|74|
|4.3.3|Implementation of AI Classification Modules|76|
|4.3.4|Implementation of Generative AI (RAG) Pipeline|80|
|4.3.5|Backend API & Logic Layer|82|
|4.3.6|Mobile Application Development (Frontend)|84|
|4.4<br>Im|plementation Output|86|
|4.4.1 O|nboarding and Profiling Interface|86|
|4.4.2 S|mart Receipt Scanning & Result Interface|87|
|4.4.3 A|I Financial Advisor Chat Interface|89|
|4.4.4 D|ashboard and Budget Tracking Views|90|
|4.5<br>Sy|stem Evaluation|92|
|4.5.1|Functional System Testing|93|
|4.5.2|AI Model Performance Evaluation|94|
|4.5.3|User Acceptance Testing (UAT)|101|
|4.6<br>Co|nclusion|108|
|**CHAPT**|**ER 5: CONCLUSION AND RECOMMENDATION**|109|
|5.1<br>Int|roduction|109|
|5.2<br>Su|mmary of Project|109|
|5.3<br>Re|visit of Project Objectives|110|



ix 

|5.3.1|First Objective|110|
|---|---|---|
|5.3.2|Second Objective|111|
|5.3.3|Third Objective|112|
|5.4<br>Su|mmary of Findings and Contributions|113|
|5.5<br>Li|mitations of the Study|113|
|5.6<br>Re|commendations|114|
|5.6.1|Interface Enhancements|114|
|5.6.2|Automated Data Integration|115|
|5.6.3|Ecosystem Expansion|115|
|5.7<br>Co|nclusion|116|
|**REFERE**|**NCES**|117|



x 

## **LIST OF FIGURES** 

|**FIGU**|**RE**|**PAGE**|
|---|---|---|
|2.1|Conceptual Map|10|
|2.2|Relationship between Present Bias and Emergency Savings|15|
|2.3|Overview of the 50/30/20 Budgeting Rule|16|
|2.4|Income Distribution Using 50/30/20 Budgeting Rule|17|
|2.5|Machine Learning Venn Diagram|19|
|2.6|Differences Between Deep and Traditional Learning Models|20|
|2.7|Natural Language Processing Workflow|22|
|2.8|Interface of Android-Based Personal Finance Tool|32|
|2.9|App Interface of Android-Based Personal Finance Tool|33|
|2.10|Interface of Machine Learning Financial App|34|
|2.11|Interface Overview of Machine Learning Financial App|34|
|2.12|Interface of Financially App|35|
|2.13|User Interface Layout of Financially App|35|
|2.14|App Interface Display of Financially App|35|
|3.1|Machine Learning Life Cycle (MLLC)|40|
|3.2|Model-View-Controller (MVC) Diagram|58|
|4.1|High-level System Screen Flow Diagram|65|
|4.2|User Interaction Storyboard for Beruang|67|
|4.3|Use Case Diagram for Beruang Application|68|
|4.4|System Flowchart demonstrating Transaction and Chat Logic|69|
|4.5|Entity-Relationship Diagram (ERD) of the Beruang Database|71|
|4.6|Hybrid Multi-Model AI Architecture Diagram|72|
|4.7|Bi-LSTM Multi-Head Model Architecture|77|
|4.8|Intent Prediction with OOD Detection|78|
|4.9|Gemini Vision Service with Prompt Engineering|79|
|4.10|Privacy Guard Implementation|80|
|4.11|Waterfall Budget Cascade Calculation|81|



xi 

|4.12|Grok Streaming with Dynamic Model Selection|82|
|---|---|---|
|4.13|API Routes Configuration|83|
|4.14|SmartWidget Dynamic Rendering|84|
|4.15|XP Reward Configuration|86|
|4.16|Onboarding Flow|87|
|4.17|Receipt Scanning Flow|88|
|4.18|Bulk Import Interface|89|
|4.19|Chatbot Interface|90|
|4.20|Home Dashboard|91|
|4.21|Expenses Screen|92|
|4.22|Transaction Classification Training Accuracy|95|
|4.23|Transaction Classification Confusion Matrix|95|
|4.24|Subcategory Classification Confusion Matrix|96|
|4.25|Prediction Confidence Distribution|97|
|4.26|Intent Classification Training Curves|98|
|4.27|Per-Intent F1 Scores|99|
|4.28|Intent Classification Confusion Matrix|100|
|4.29|Respondent Age Distribution from Google Forms|102|
|4.30|User Intent for Regular Usage|103|
|4.31|Application Ease of Use Ratings|103|
|4.32|Receipt Scanning Accuracy Ratings|104|
|4.33|Gamification and User Engagement Ratings|104|
|4.34|Transaction Categorization Accuracy Ratings|105|
|4.35|Chatbot Advice Personalization Ratings|106|
|4.36|Chatbot Local Context Relevance|106|
|4.37|User Trust in AI Financial Advice|107|
|4.38|Impact on Personal Financial Confidence|107|



xii 

## **LIST OF TABLES** 

|**TAB**|**LE**|**PAGE**|
|---|---|---|
|2.1|Frequency of the Problem encountered in Budgeting|12|
|2.2|Comparison of Transformers Model|26|
|2.3|Comparison between NLP Applications|29|
|2.4|Comparison between Similar Applications|36|
|3.1|Model Requirements Analysis|43|
|3.2|Data Collection and Preprocessing Phase of MLLC|45|
|3.3|Model Selection and Training|47|
|3.4|Application Design and Development Phase of MLLC|50|
|3.5|Integration and Testing Phase of MLLC|51|
|3.6|Usability Evaluation Phase of MLLC|53|
|3.7|Summary of Project Methodology|55|
|3.8|Hardware Requirements|61|
|3.9|Software Requirements|62|
|4.1|Backend Technology Stack|73|
|4.2|Transaction Classification Metrics|94|
|4.3|Intent Classification Metrics|98|



xiii 

## **LIST OF ABBREVIATIONS** 

AI Artificial Intelligence API Application Programming Interface BERT Bidirectional Encoder Representations from Transformers Bi-LSTM Bidirectional Long Short-Term Memory BNM Bank Negara Malaysia DOSM Department of Statistics Malaysia ERD Entity-Relationship Diagram GPT Generative Pre-trained Transformer iOS iPhone Operating System JSON JavaScript Object Notation LLMs Large Language Models MAE Mean Absolute Error ML Machine Learning MLLC Machine Learning Life Cycle MSE Mean Squared Error MVC Model-View-Controller NLP Natural Language Processing OCR Optical Character Recognition OOD Out-of-Distribution OS Operating System PFM Personal Financial Management RAG Retrieval Augmented Generation RAM Random Access Memory SDK Software Development Kit SQLite SQL Database Engine SSE Server-Sent Events SUS System Usability Scale UAT User Acceptance Testing UI User Interface XP Experience Points 

xiv 

## **CHAPTER 1** 

## **INTRODUCTION** 

This chapter introduces a research project on the development of Beruang, a money management mobile application that provides personalized financial counseling to young adults by leveraging machine learning (ML) and natural language processing (NLP) technologies. The chapter introduces personal financial management, as well as current developments in artificial intelligence applications for personal finance. The chapter also elaborates on the problems this study aims to solve, which focus especially on what is missing with respect to accessible and inexpensive financial advisory services for young adults and lack of financial applications. The end goal is to develop a mobile application that integrates core financial management features such as budgeting, expense tracking, spending insights, and personalized advice through an AI-powered chatbot. The chapter then proceeds with an outline of the project objectives and a discussion of scope and development boundary focusing on the target audience, platform, and features that were offered. The significance of the study was also elaborated in terms of its contribution toward improving financial literacy among young adults and onset of the development of AI-powered personal finance tools. Finally, the chapter ends with a summary of its main content. 

## **1.1 Background of Study** 

Personal Financial Management (PFM) is a set of systems and tools individuals use for planning, allocating, and tracking financial resources to achieve their goals at both short and long-term periods. Traditionally, individuals resorted to manual budgeting and forecasting methods, which are generally subject to inaccuracy, rigidity, and rather time-consuming practices due to their reliance on static assumptions in real-time financial changes (Nguyen & Lee, 2021). These problems are the reason why financial education is important as it plays a pivotal role in navigating complex banking and payment ecosystems. Higher 

1 

levels of financial education correlate with better quality of life, informed decision making, resilience during economic shocks, possible pathways out of poverty, whereas insufficient financial education leads to over indebtedness undermining stability within households and major life decisions such as housing and retirement planning (Gallardo-Vázquez et al., 2024). Research by Anipa et al. (2025) confirms that PFM broad practices, such as comprehensive financial planning, disciplined budgeting, and proactive cash flow management have been proven effective in aiding users optimize resource utilization while overall enhancing financial performance. Today, individuals can leverage financial-aggregation mobile apps to drastically lessen nonsufficient fund fees and guide financial decisions (Carlin et al., 2023). In addition to the use mobile apps, there are various advanced tools that may be leveraged in making sound financial management.  One example is the use of machine learning (ML) techniques. Integrating ML capabilities into financial apps can greatly improve user experience (Gao et al., 2024). 

The integration of ML with AI-powered chatbots and large language models (LLMs) in personal finance makes customized budgeting, investment, loan, and tax planning advice possible, thereby streamlining financial management and making it efficient (Hean et al., 2025). ML chatbots are able to analyze the financial behaviour of an individual through NLP models and provide personalized context-driven recommendations about spending, saving, and investment decisions (Polireddi, 2024).One important factor for their success is extensive training of the model, quality of data input, and transparency of the algorithm design in order to build and maintain user trust (C. Y. Li et al., 2023). Hence, based on these findings, this project aims to develop a money management mobile application with the ML-based personal financing chatbot to provide easily accessible AI-driven advice on effective daily money management (Dowling & Lucey, 2023). 

2 

## **1.2 Problem Statement** 

Ideally, everyone should have a personal financial advisor to help one make informed decisions about spending, saving, and investing. Financial advisors give personalized guidance that improves financial well-being and helps achieve long-term goals. Financial well-being is closely linked to the welfare and mental satisfaction of an individual (Sajid et al., 2024). Moreover, with the rise of digital finance applications, individuals should be able to access personalized financial guidance anytime and anywhere through mobile or webbased platforms. The integration of digital finance applications available through mobile and web platforms could truly increase financial literacy and self-efficacy, thus enhancing the financial well-being of individuals (Khairi et al., 2024). 

Unfortunately, the lack of access to professional financial advice for many seems justified, as their affordability constraints blend with limited awareness about the extent of financial management tools available to the public. In addition, not many financial guidance applications are available and not many people are aware of it. Even when there are, the apps often lack advanced functionalities. According to Alenazi & Sas (2023), the budgeting tools mostly aid in tracking expense alone, hence mental accounting goes unsupported by most of them. Moreover, many young adults struggle with financial problems due to their poor financial knowledge and weak technical skills (Ahmad & Mohamed Zabri, 2023). This might be potentially damaging influence on how individuals make financial decisions, causing the onset of financial distress that can smartly be avoided (de Bruin et al., 2024). In addition, low financial literacy and low levels of confidence affect the demand for financial advice, as people may not recognize the value or need for such services (Liu & Lu, 2023). Although financial chatbots have emerged as one potential solution to address the issue, new studies have demonstrated that users tend to trust these AI advisors more based  on their conversational style than on the accuracy of the 

3 

advice, which could lead the users to make faulty financial decisions (Takayanagi et al., 2025). 

Consequently, the lack of financial guidance leads to financial stress and bad spending habits, thus negatively impacting one's well-being (M. Rahman et al., 2021). Based on the study conducted by Simonse et al. (2024), financial stress affects not only an individual’s financial health but also overall well-being and the ability to make prudent decisions. As a result, many young adults experience financial hardships after making poor financial choices (Ahmad & Mohamed Zabri, 2023). Furthermore, financial difficulties faced by young adults is closely connected to psychological distress like anxiety and depression, underscoring that financial challenges significantly affect mental health (Nasir et al., 2025). 

Therefore, based on the identified problems, the application was designed and developed as a money management mobile application with an ML-powered financial chatbot that leverages NLP to offer personalized context-based advice. In order to fill the gap of financial advisory services and allow users to be more informed financial decision-makers for their own financial well-being, this app offers a low cost and easily accessible alternative. The adaptation of AI in financial services, especially through chatbots, has been proven promising in enhancing user engagement and providing real-time assistance (Zhu et al., 2024). 

## **1.3 Project Objective** 

The project consists of three main objectives that guide its development process. The following are the objectives of the project: 

- a) To identify the suitable Machine Learning (ML) and Natural Language Processing (NLP) techniques in delivering personalized financial recommendations. 

4 

- b) To develop a money management mobile application with personal financing chatbot for promoting better money management habits. 

- c) To evaluate the usability of the developed application in providing accessible financial guidance. 

## **1.4 Scope of Study** 

This project focuses on developing a mobile application for managing money which is capable of providing personalized financial advice via ML chatbots. It fills the accessible gap in the affordable financial advisory services for young adults aged 18 to 30 years, a group that frequently experiences financial challenges and wants to manage their finances better. The application was developed using React Native which ensures cross-platform compatibility and development using Cloud Firestore for scalable data management, authentication, and user data management. It features a clean, easy-to-use interface that offers daily budgeting, savings, expense tracking, viewing spendings as charts and graphs, and automatic categorization of expenses as per the 50/30/20 rule which divides them into Needs, Wants, and Savings. Data entry is user-initiated without direct bank integration, facilitated by manual input or AI-assisted receipt scanning to reduce friction. 

One basic and essential part of the application is the chatbot. The chatbot has the capability of understanding the user inputs by using NLP techniques and the chatbot is used to create personalized recommendations based on the financial status of each user. It makes use of the intent-classification and NLP models as trained on synthetic and anonymized data to improve the relevance of the response for the user. Users were given the chance to interact with the chatbot about their financial issues, and that chatbot helps the user with making prudent decisions on their budgeting, saving, and spending habits by generating responses more appropriate to the financial profile of the user. The advice is also closely examined with respect to user financial profile and transaction behaviour, before any recommendation is 

5 

made since the response generated should be accurate, feasible, and relevant to the user needs. The application integrates gamification elements with an avatar evolution system across 13 levels to promote consistent financial discipline among young adults. 

Furthermore, the project is limited to offering financial advice based on basic income and expense patterns. It does not perform real-time financial transactions, manage investments, or provide professional financial services. Another limitation is the application can only be accessed if there is an internet connection. Next, the chatbot supports only text-based interactions, and the dataset used was limited to user-provided information and synthetic financial data for testing purposes. The project does not include voice-based interactions, third-party financial API integrations, or real-time transaction processing. 

## **1.5 Significance of Study** 

This project contributes to the body of knowledge by demonstrating how ML and NLP techniques are effectively applied within a money management mobile application to provide personalized financial guidance for young adults. The study highlights the integration of a Hybrid AI Architecture combining local Bi-LSTM models with cloud-based Gemini and Grok services, offering new insights into user engagement, recommendation accuracy, and improvements in financial behaviour through interactive chatbot conversations, alongside intuitive app features such as budgeting dashboards, expense tracking, and automated categorization of expenditures. The implementation of a RetrievalAugmented Generation pipeline demonstrates how context-aware financial advice can be delivered using Malaysian-specific economic data from the Department of Statistics Malaysia, providing culturally relevant and localized guidance. 

6 

This project is especially important for young adults aged 18 to 30, a group that often faces financial challenges such as budgeting, saving for future goals, and managing daily expenses. By providing easy access to personalized financial advice through a mobile chatbot embedded in a fullfeatured money management application, young adults can develop better money management habits, gain financial confidence, and reduce financial stress. Moreover, the visual analytics helps users understand their spending patterns at a glance, further enhancing informed financial decision-making. Additionally, the mobile application may serve as a budget tracker and financial advising tool that can be accessed from everywhere and anytime as long as there is internet connection. In addition, the study also benefits developers and researchers by offering a framework for creating AI-driven financial assistance tools that are accessible, user-friendly, and tailored to the needs of younger generations, demonstrating best practices in hybrid model architectures, privacy-preserving local processing, data security with Cloud Firestore integration, and cross-platform development using React Native. 

## **1.6 Conclusion** 

In conclusion, this chapter introduced the research project’s main goal which is developing a money management mobile application that provides personalized financial guidance to young adults using ML and NLP. It discussed the importance of personal financial management in improving financial decision-making and highlighted how AI-powered solutions can make financial advice more accessible and effective. The chapter identified the lack of affordable and accessible financial advisory services as well as very few financial apps for young adults as a major problem, leading to poor money management and increased financial stress. The aim of the project is to develop a user-friendly mobile application featuring daily budgeting tools, expense tracking, spending insights, gamification elements, and a financial chatbot to promote better money management habits. The scope of 

7 

the study focuses on young adults aged 18 to 30, utilizing React Native for development and Cloud Firestore for secure data management. This study is significant in offering young adults a practical, accessible tool that can be accessed anywhere and anytime to enhance their financial literacy and habits, while also contributing to the advancement of AI-driven personal finance solutions. 

8 

## **CHAPTER 2** 

## **LITERATURE REVIEW** 

## **2.1 Introduction** 

This chapter provides a comprehensive review of personal finance management tools, machine learning technologies, and existing financial applications to establish the rationale for developing Money Management Mobile Application with a Personal Financing Chatbot. It examines how digital tools help young adults manage budgeting, saving, and expenses, while evaluating existing apps like Android trackers, ML-driven platforms, and basic tools lacking conversational features. It highlights gaps in personalization, justifying the use of NLP and transformer models like BERT, GPT and Grok for adaptive, human-like financial guidance. Figure 2.1 illustrates the Conceptual Map of the project. 

9 



<!-- Start of picture text -->
Money Management<br>Mobile Application<br>With Personal<br>Financing Chatbot<br>MACHINE<br>wee | —T<br>UNSUPERVISED SUPERVISED<br>PROCES LEARNING LEARNING<br>a PERSONAL CORPORATE<br>FINANCE FINANCE<br>RAG SYSTEM TRANSFORMERMODELS APPLICATIONOF NLP DIRECTIONALLSTMBE MULTIMODALAl<br>EXPENSE GAMIFICATION VISUAL<br>TRACKING (xP) ANALYTICS<br>a “we oe<br>Gureor MACHINE SPEECH<br>TRANSLATION | |RECOGNITION<br>INTENT<br>CLASSIFICATION<br><!-- End of picture text -->

areas like investment, personal finance, and corporate finance serve a unique role in defining the broader financial ecosystem. 

Investment especially among Malaysian individuals are notably influenced by financial literacy and professional financial advice. Based on the study by Hii et al. (2022), it is clear that individuals with higher financial literacy levels and those who seek financial advice are more likely to participate in the stock market, underscoring the importance of financial education and advisory services in promoting investment activities. Personal finance, on the other hand, is about financial resource management related to individual or household money management. Personal Financial Management (PFM) is particularly necessary for young adults who are facing unique financial challenges in the current economy (Imawan et al., 2025). Corporate finance however, emphasizes how companies use their financial resources in order to maximize value for shareholders. In 2023, the Malaysian capital market grew by 5.6%, reaching RM3.8 trillion in size. This growth was occasioned by rising equity market capitalisation and growth in bonds and sukuk outstanding, evidencing a resilient financial environment (Securities Commission Malaysia, 2023). Sukuk, also known as Islamic bond or Sharia-compliant bond, is an Islamic financial certificate that represents a portion of ownership in a portfolio of eligible existing or future assets. 

## **2.2.1 Personal Finance** 

Personal finance involves managing one's financial resources to meet life goals and ensure financial security. This critical practice involves handling income, saving, investing, spending, and planning for diverse financial needs throughout one's life. Effectively managing personal finances, including tracking cash flow and adhering to a budget, is a fundamental step toward achieving financial independence (Imawan et al., 2025). It is well-established that personal financial literacy and sound practices are linked to overall wellbeing. Young adults, in particular, often encounter unique financial hurdles due 

11 

to factors such as limited prior experience and fluctuating income. For instance, Imawan et al. (2025) have stated that young Indonesian adults have shown patterns of inconsistent financial record-keeping, infrequent review of income and expenses, and a low adherence to monthly budgets. Table 2.1 from Peralta et al. (2024) studies illustrates some of the specific problems encountered when budgeting, shedding light on the difficulties that contribute to these patterns. The prevalence of high online loan usage among this demographic further underscores the pressing need for improved financial management tools. These challenges highlight that youth often require significant support in planning and discipline regarding financial matters. 

**Table 2.1** Frequency of the Problem encountered in Budgeting 

|**Problems Encountered**|**Frequency**|
|---|---|
|**Unexpected Expenses**|27|
|**Short Allowance**|26|
|**Impulsive Buying**|24|
|**Difficulty in Budgeting**|22|
|**Overspending**|15|
|**Unexpected School Expenses**|14|
|**Sudden Increase of Commodity Prices**|11|
|**No Budget Method**|8|
|**Food Expenses**|7|
|**High Fare Expenses**|7|
|**Misalignment of Budget Method**|4|
|**No Emergency Fund**|4|
|**Poor Budgeting Strategy**|4|
|**Consecutive school expenses**|3|



(Source: Peralta et al., 2024) 

Considering the unique difficulties young people face and the increased integration of digital technology in everyone’s daily life, mobile or digital solutions have become a greater need when it comes to dealing with the variety of problems that are closely linked to money management (Garcia & Claour, 2021; Imawan et al., 2025). Garcia & Claour (2021) have stated that several 

12 

money management tools exist, but most are targeted toward the general user and may not fulfill the specific criteria to match the needs of younger audiences who are inclined toward interactive and mobile-first solutions. Imawan et al. (2025) further argued that mobile, being high in daily usage, is the ideal platform for instilling positive financial habits. Garcia & Claour (2021) explained that applications can help users by reinforcing consistent tracking of their finances and encouraging reflection. By providing accessibility as well as engaging experiences, such digital tools could potentially assist in educating young adults to assess their financial situation and make more thoughtful decisions. Such tools are crucial for fostering key behaviours, including saving, budgeting, and expense tracking. Simply, saving is the act of setting aside some portion of money for future needs or goals. Furthermore, implementing effective budgeting is a process of making a plan for one’s money to monitor spending (Peralta et al., 2024). In addition, Imawan et al. (2025) further noted that tracking expenses is the systematic recording of each expenditure that gives visibility into where money is going and helps with budgeting and saving. 

Modern personal finance applications increasingly incorporate gamification and visual analytics to enhance user engagement and comprehension. Gamification applies game design elements such as experience points, level progression, and achievement systems to transform routine financial tasks into rewarding experiences. Research by Bitrián et al. (2021) demonstrates that gamified financial applications successfully increase user motivation and longterm adherence to budgeting goals by making financial management feel less tedious and more interactive. Visual analytics complement this approach by presenting complex financial data through intuitive charts, graphs, and dashboards that enable users to quickly grasp spending patterns and budget allocation. Similarly, Imawan et al. (2025) found that young adults responded positively to visual progress tracking and financial summaries in a budgeting app, suggesting that intuitive visual feedback can enhance engagement. Together, these design strategies address the engagement gap in conventional 

13 

finance tools by making budgeting accessible and appealing to digitally native users. 

## **2.2.2 Savings** 

Saving represents one of the major personal finance acts. It refers to allocating a portion of income for future use in case of emergencies, big purchases, or retirement. Household finance research indicates that saving behaviour depends on the financial literacy of the population and the avenues for people to track their expenses. While the study of savings historically focused on saving trends at macro levels, on the micro-level, savings are mostly driven by the discipline of budgeting and awareness of expenses (Núñez‐Letamendia et al., 2025). In Malaysia, a behavioural science studies highlight how young adults tend to manifest what has been termed as a "present bias," leading them to prioritize immediate spending over long-term saving, which may hinder their ability to build emergency funds or simply save for their future (PIDM, 2022). The distribution of present bias across emergency savings levels is shown in Figure 2.2. It shows that individuals who tend to have higher savings have a lower level of present bias. In line with this, technology like application can play a supportive role in shaping such behaviour. Applications that categorize expenses and pinpoint saving opportunities may help to raise saving rate. Digital finance tools that help with consistent saving and tracking the achievement of goals, could be effective for enhancing beneficial financial behaviours. 

14 



<!-- Start of picture text -->
Distribution of present bias based on emergency savings levels<br>25 =<br>J<br>r) i]<br>n<br>s<br>2<br>5<br>é<br>°<br>-25 i 8 ° °<br>e<br>JJ<br>.<br>°<br>-5.0 °<br>Less than RM 2,000 RM 10,001 to RM 20,000 RM 50,001 to RM 100,000<br>RM 2,001 to RM 10,000 RM 20,001 to RM 50,000 RM 100,001 and above<br>Levels of emergency savings<br><!-- End of picture text -->



<!-- Start of picture text -->
Budgeting Rule 50) 50)20)<br>Essentials Commitments<br>30%<br>50%6<br>20%<br>Savings<br>eon<br>Essentials Commitments Savings<br>These are your Allocate this towards Put this aside for<br>"must-haves" like rent, regular payments such emergencies,<br>food and transport - as loan repayments or long-term goals,<br>the necessities for paying off debt. or future plans.<br>daily living.<br><!-- End of picture text -->



<!-- Start of picture text -->
Monthly Net Income: RM 4,500<br>2 O y/ RM 400 Emergency fund<br>setsavingsaside foroO aRMRM 300 200 Long-term Travels and goals hobbies of =<br>teaes, Samet<br>30%3. RM 700 Loan repayments<br>monthly RM 400 Insurance/ takaful<br>commitments/ RM 250 Subscriptions +<br>pay off debt<br>ae<br>RM 1,000 Healthcare/ Personal care<br>50% eRM 450 Groceri e s<br>onl Cece<br>nequeditlies RM 400 Transportation |.<br>RM 400 Other expenses en<br><!-- End of picture text -->

manually or automatically, classify them, and provide summaries with visualizations of their spending habits (Imawan et al., 2025). They help identify areas where one spends too much and where one can save. As one analysis notes, expense tracking tools help the users recognize their spending patterns, identify the areas of potential savings and make smarter budgeting decisions by providing users with comprehensive breakdown of their income and expenses (Jain et al., 2025). This knowledge can be used to make better financial decisions, given that the average person tends not to diligently keep track of his minor expenses. Without tracking, literature suggests that people tend to spend more than they should or neglect to save something; expense tracker applications thwart this by working on their behalf by automatically entering in data and alerting them whenever their spending departs from the plan. For example, based on the study conducted by Pooja Bhatt et al. (2024), it states that many users find it difficult to keep track of expenses, resulting in overspending or inability to save, thus concluding that expense tracking tools are necessary to solve this problem. In short, expense tracking is the foundation of personal finance in terms of knowing where the money is going toward spending. 

The application focuses on three (3) areas of personal finance, which are savings, budgeting and expense tracking. By putting these areas together, users can examine how their spending is impacting their budget, budget their expenses, and track their savings goals. The benefit of this integration is that users can view their finances as a whole, instead of in separate parts, thus potentially improving their financial decision making. 

## **2.3 Overview of Machine Learning** 

Machine learning (ML) is a foundational concept for intelligent systems that mimic human behaviour, enabling them to learn from problem-specific training data to automate the process of analytical model building and solve associated tasks (Janiesch et al., 2021). The structure of machine learning is shown in 

18 



<!-- Start of picture text -->
Shallow<br>machine<br>learning<br>Machine<br>learning<br>Deep<br>learning<br><!-- End of picture text -->



<!-- Start of picture text -->
Machine Learning —<br>r<br>Deep Learning —<e.<br>‘<br><!-- End of picture text -->

Wang et al., 2024). According to Wang et al. (2024), NLP finds broad application in various fields, including areas such as text mining, speech recognition, machine translation, and sentiment analysis. The financial industry is fast evolving into a world where NLP technologies serve as a critical enabler for innovation, empowering data-driven strategies and decision frameworks (Du et al., 2025). L. Wang et al. (2024) further explained that natural Language Processing (NLP) has quite actively contributed to the financial sector, especially to risk management, attempting to provide significant benefits for analyzing and processing huge amounts of unstructured textual data from various sources ranging from financial reports, corporate announcements, social media, and news articles. Applications of NLP in the financial sector include mood analysis, public opinion monitoring, automatic report generation, and risk detection. L. Wang et al. (2024) also stated this field involves critical stages such as text processing, the use of advanced models like Transformers, and a wide array of financial applications. 

Text processing or text preprocessing is one very important key concept in NLP systems, transforming raw unstructured text into analyzable formats for computational tasks through processes like segmentation to divide text into words or tokens and cleaning to remove noise in terms of redundant tags, special symbols, and stop words, so as to reduce interference by irrelevant data (L. Wang et al., 2024). Figure 2.7 shows the foundation of NLP processing workflow. According to the study by Du et al. (2025), transformer-based architectures, such as powerful LLMs, creating huge impact on NLP in finance, redefining sentiment analysis, automatic queryanswering, and text analysis of economic narratives. The author further explained that advanced AI models have transform the industry by simplifying complex processes, customising interactions, synthesising datadriven insights, and supporting enhanced decision-making for financial advisor roles. NLP is applied for various problems in the finance sector, including automated systems like chatbot, virtual assistant, market data 

21 



<!-- Start of picture text -->
Useless label<br>Special symbol<br>Stop word<br>raw Segmentatio Normalizatio<br> data = h<br>Feature<br>WEB Extraction<br>Text news<br>Report<br>Similarity algorithm .<br>Classification algorithm ttidf<br>word2vec<br><!-- End of picture text -->

system to retrieve user-specific transaction history, budget allocations, and demographic profiles before formulating advice, thereby delivering hyperpersonalized recommendations anchored in actual financial data rather than generic suggestions. The integration of RAG transforms conversational AI from pattern-based response generation to knowledge-grounded consultation, making it an essential technique for building trustworthy financial advisory systems. 

## **2.3.2 Supervised Learning** 

Supervised learning builds predictive models from labeled data, handling both classification and regression tasks where models learn patterns in training examples and assign new inputs to known categories (An et al., 2023). According to An et al. (2023), performance is validated by splitting data into training and test sets, with metrics like accuracy or F1 score measuring effectiveness. Based on the study conducted by Obaido et al. (2024), recent surveys confirm supervised learning remains the most widely used approach to solve real-world problems. While traditional classifiers such as logistic regression work well for structured numerical data, financial transaction descriptions present unique challenges due to their sequential and contextual nature. As demonstrated in the research by Anand & Prakasam (2024), bidirectional Long Short-Term Memory networks address these challenges by analyzing text sequences in both forward and backward directions simultaneously, capturing contextual dependencies that determine meaning. Unlike feed-forward networks that process words independently, Bi-LSTM employs specialized memory cells with gating mechanisms that selectively retain or discard information across sequence steps, enabling the model to understand that a phrase like "nasi lemak sedap" requires contextual interpretation rather than word-by-word classification (Mohd Shamsuddin et al., 2024). This bidirectional processing proves essential for financial applications where informal descriptions contain colloquial language, abbreviations, and domain-specific terminology. As indicated by C. Li et al. (2025), for transaction categorization tasks, Bi-LSTM processes tokenized 

23 

descriptions by encoding contextual patterns from both temporal directions, making it particularly effective at distinguishing between semantically similar expenses based on subtle linguistic cues present in user-generated text. 

## **2.3.3 Transformers Model** 

Transformers are a class of neural network architectures that have revolutionized NLP. Unlike older building blocks based on recurrence, Transformers introduce self-attention mechanisms that perform language tasks in parallel, thereby permitting modeling of long-range context. Two of the prominent transformer-based models include BERT and GPT. 

BERT, by Devlin et al. (2019) is a bidirectional model that simultaneously reads context from left to right. It is trained on massive amounts of text by jointly conditioning on all words of a sentence. This deep bidirectional training makes it so powerful for language understanding. According to Devlin et al. (2019), BERT offers state-of-the-art results on many NLP benchmarks while requiring very few architectural changes. Therefore, a BERT-based model for the chatbot could be fine-tuned for user intent classification or for information extraction from queries. Because of its excellent performance in intent recognition and named-entity recognition in previous works, it would be a good candidate for the intent classification module. According to Mussa et al. (2025), MiniLM represents a distilled variant of BERT that maintains the core transformer architecture while achieving significantly reduced model size and faster inference speed. The author also mentioned that this model employs knowledge distillation techniques where a larger teacher model transfers learned representations to a smaller student network, preserving performance while dramatically decreasing computational requirements. Furthermore, MiniLM proves particularly valuable for resource-constrained environments and real-time architectures where inference efficiency is paramount to minimizing latency. Findings from Wahidur et al. (2024) found that in sentiment classification tasks, MiniLM achieves strong zero-shot performance 

24 

comparable to larger models while requiring substantially less memory and processing power. Thus, making it the optimal choice for high-throughput query routing in financial chatbot applications where minimizing operational overhead is critical. 

The GPT family, in contrast, uses an autoregressive approach where the model predicts the next word in sequence. For example, GPT-3, with 175 billion parameters representing a huge memory store, is a model with few-shot learning quality, able to perform a new task with a handful of examples given at runtime. GPT-based models seem excellent at producing coherent and human-like text. For the response generation of the chatbot, a GPT-style model could therefore generate naturally sounding advice. Brown et al. (2020) claimed that GPT-3 performed well on translation, question-answering, and other tasks without any further fine-tuning, relying solely on textual prompts. Consequently, this hints that an adequately powerful GPT-based model could convert queries into pertinent financial advice. As stated by xAI (2025), Grok represents a state-of-the-art large language model developed by xAI that emphasizes speed, reasoning capabilities, and real-time information access. xAI (2025) also mentioned that Grok distinguishes itself through a unique architecture optimized for fast inference while maintaining high-quality output, making it particularly suitable for applications requiring low-latency streaming responses. Furthermore, the model demonstrates strong performance in multistep reasoning tasks and contextual understanding, which proves valuable for financial advisory applications where responses must consider multiple interconnected factors simultaneously. 

According to xAI (2025), Grok's integration with real-time web search capabilities enables it to access current market data, policy updates, and economic indicators during response generation, addressing the limitation of static knowledge cutoffs present in traditional language models. In addition, for personal finance chatbots, Grok's combination of rapid response generation and dynamic knowledge retrieval allows the system to provide timely advice 

25 

that considers both user-specific financial data and current external conditions such as interest rates or inflation trends. Lastly, the model's architectural efficiency makes it cost-effective for applications requiring frequent API calls while maintaining response quality comparable to larger models. 

Choosing between BERT, GPT and Grok usually all depends on the task being performed. For example, BERT-type models are suited more to understanding user input, such as in intent classifications however GPT and Grok are instead designed and used for generating fluent answers. Both approaches use Transformer architectures, which have been the standard in NLP due to their effectiveness. 

Table 2.2 compares the BERT, GPT and Grok transformer models on various important criteria such as strengths, architecture, best cases for usage, and requirements for fine-tuning. 

**Table 2.2** Comparison of Transformers Model 

|**Criteria**|**BERT**|**GPT**|**Grok**|
|---|---|---|---|
|**Main Strength**|Understanding and<br>classifying input|Generating natural,<br>fluent responses|Generating natural, fluent<br>responses with real-time<br>access, fast inference, and<br>low cost|
|**Architecture**|Bidirectional (reads<br>context both ways)|Autoregressive<br>(predicts next word<br>left-to-right)|Autoregressive with<br>optimizations for speed and<br>reasoning|
|**Best For**|Intent classification,<br>information extraction|Response generation,<br>conversational replies|Response generation, multi-<br>step reasoning, real-time<br>data integration|
|**Fine-tuning**<br>**Needs**|Requires fine-tuning for<br>each task|Can perform well with<br>few-shot learning|Can perform well with few-<br>shot learning and dynamic<br>knowledge retrieval|
|**Suitability in**<br>**Chatbot**|Ideal for understanding<br>what the user wants|Ideal for generating<br>human-like advice or<br>answers|Ideal for generating timely,<br>context-aware human-like<br>advice|



Based on its strong reasoning, fast inference, real-time knowledge access, highquality coherent responses, and significantly lower cost compared to similar 

26 

models, Grok was the best option for this project. Therefore, the developed application uses a Grok-based model for generating relevant financial advice, while employing MiniLM, a distilled BERT variant, for efficient intent classification. 

## **2.3.4 Application of NLP** 

The fundamental goal of Natural Language Processing (NLP) applications is to ease user interaction and communication with computers using human language, particularly for those who are not proficient in machine-specific languages (Khurana et al., 2023; Patwardhan et al., 2023). NLP aims to accommodate specific aspects of an algorithm or system. According to Khurana et al. (2023) and Patwardhan et al. (2023), this field has recently seen considerable attention and its applications have spread across numerous domains. The authors also noted that key applications of NLP include the development of conversational agents or chatbots, enabling automatic machine translation between languages, processing spoken language which is related to speech recognition, and performing text summarization to condense lengthy documents (Shakil et al., 2024). 

Focusing on interactive systems, Chatbots, also known as dialogue systems, are designed to allow interactions with users through text or voice, and are used in real-life applications (Khurana et al., 2023; Pimparkhede & Bhattacharyya, 2025). According to Pimparkhede & Bhattacharyya (2025), a crucial component underpinning the functionality of these conversational agents is Intent Classification. The author further explained that this component is used to interpret user expressions and make users understand the goal behind their own utterances. Pimparkhede & Bhattacharyya (2025) also stated that after the intent has been identified, the desired actions are recognized, together with "slots" or crucial information needed for satisfying the request of the user. Deep learning models perform well in this area. 

27 

Beyond conversational interfaces, there are a few other vital functionalities an application needs NLP techniques for (Patwardhan et al., 2023). According to Khurana et al. (2023) and Patwardhan et al. (2023), machine Translation is the translation of text from one human language to another by computer programs. The authors noted that the target is to output a fluent and accurate translation, with the meaning of the source text, and these models mostly make use of an encoder-decoder architecture. Based on the study conducted by Patwardhan et al. (2023) speech Recognition is a research task within NLP, where language modeling is one building block and transformer models have been used in transcribing speech. According to the study by Khurana et al. (2023) and Shakil et al. (2024), Text Summarization refers to an NLP technique in which the input text is reduced to a more compact and shorter version while still retaining the core information. Based on their studies, basically, the idea is to help users quickly apprehend the main topics and ideas presented in a document within a short time without having to read through the entire text themselves. Shakil et al. (2024) also explained that this can be done by identifying and extracting the most relevant information, sentences, or phrases in the original text, as well as generating synthesized information. 

According to Agrawal et al. (2021) and Z. Wang et al. (2023), text summarization techniques prove particularly valuable in financial applications where users require condensed insights from lengthy transaction histories, budget reports, or market analyses. Based on the research conducted by Narangarav Batbaatar (2025) and Mou et al. (2025), modern summarization systems employ both extractive methods that select key sentences from source text and abstractive methods that generate novel phrasing to convey essential information concisely. Braithwaite et al. (2025) also demonstrated that, in personal finance management, automated summarization enables users to quickly grasp monthly spending patterns, identify overspending categories, and receive actionable recommendations without manually reviewing detailed transaction logs. Advanced transformer-based summarization models can process unstructured financial narratives such as bank statements or investment 

28 

reports to generate coherent summaries that highlight critical trends, anomalies, and actionable insights tailored to user financial goals, according to Khanna et al. (2022) and Narangarav Batbaatar (2025). 

Table 2.3 below provides a comparison of key Natural Language Processing (NLP) applications discussed in this literature review. It highlights their main functions, the techniques they use, and common examples or use cases. For clarity, the chatbot and its core component, intent classification, are grouped together as one application since they work closely to enable interactive communication with users. 

**Table 2.3** Comparison between NLP Applications 

|**NLP Application**|**Function**|**Techniques Used**|**Examples / Use Case**|
|---|---|---|---|
|**Chatbot (with**|Understand and respond|Deep learning, Intent|Customer service bots,|
|**Intent**|to user input in text or|Classification, Slot|virtual assistants|
|**Classification)**|voice|Filling||
|**Machine**|Translate text from one|Encoder-decoder|Translating English to|
|**Translation**|language to another|architecture|Malay or vice versa|
|**Speech**|Convert spoken language|Transformer models,|Voice commands,|
|**Recognition**|into written text|Language Modeling|voice-to-text apps|
|**Text**|Create a concise version|Extractive and|Summarizing financial|
|**Summarization**|of a longer text while<br>keeping key information|Abstractive<br>Summarization|reports, transaction<br>histories, news<br>articles, or research<br>papers|



Among the various NLP applications discussed, this project focuses on implementing a chatbot with intent classification as its primary NLP component, alongside text summarization for processing financial data such as receipts and transaction histories, and generative models for advice generation. This aligns with the project's goal of providing personalized financial recommendations through a conversational experience and data-driven insights. 

29 

## **2.3.5 Deep Learning** 

Based on the research conducted by Guo et al. (2024) deep learning represents a specialized subset of machine learning that employs artificial neural networks with multiple hidden layers to automatically learn hierarchical representations from raw data. Unlike traditional machine learning approaches that require manual feature engineering, deep learning models discover relevant patterns through layer-by-layer processing. The depth of these networks enables modeling of complex relationships that simpler algorithms cannot capture (Biju et al., 2024). Research by Li et al. (2023) demonstrated that, deep learning has achieved breakthrough performance in domains involving unstructured data such as images, text, and audio. In financial applications, architectures like recurrent neural networks for sequential transaction data, convolutional neural networks for document image processing, and transformers for natural language understanding have proven superior to classical methods. Modern deep learning frameworks provide automated differentiation and optimized implementations, enabling developers to build intelligent financial systems with accessible tools. 

## **2.3.6 Multimodal Artificial Intelligence** 

Multimodal Artificial Intelligence refers to systems capable of processing and integrating information from multiple data modalities simultaneously, including text, images, audio, and structured data (Yin et al., 2024). Unlike unimodal systems that operate on a single type of input, multimodal AI models learn joint representations across different data sources, enabling more comprehensive understanding and richer contextual analysis. According to Gerling & Lessmann (2025), this integration capability proves particularly valuable in real-world applications where information naturally exists in multiple forms, including financial documents that combine textual descriptions with visual elements like receipts, charts, and signatures. 

30 

Google Gemini represents a state-of-the-art multimodal AI system specifically designed to seamlessly process both visual and textual information within a unified architecture (Team Gemini, 2024). The Gemini 2.5 Flash variant emphasizes rapid inference while maintaining high accuracy across vision and language tasks, making it particularly suitable for mobile applications requiring real-time processing. In the context of financial applications, Yu et al. (2025) noted Gemini's vision capabilities extend beyond simple Optical Character Recognition to semantic understanding of receipt structures, enabling the system to not only extract text from receipt images but also comprehend the contextual relationships between merchants, items, prices, and totals. This contextual comprehension allows the model to generate classifierfriendly descriptions that capture the semantic essence of purchases rather than merely transcribing raw text, facilitating more accurate downstream categorization of expenses. The model's ability to handle diverse receipt formats, from printed restaurant bills to handwritten market stall receipts, demonstrates the robustness of multimodal approaches in managing real-world variability in financial document processing. 

## **2.4 Comparison of Existing Applications** 

This section offers an in-depth analysis of some of the existing financial management applications that either conceptually or functionally bear resemblance to the one that is the aim of the present work. These applications serve as good reference points for testing various design trade-offs, userinteraction paradigms, and technology into processes that promise the promotion of financial literacy and self-discipline in money management. Among the notable applications are the Android-Based Personal Finance Tool, the Machine Learning Financial App, and the Financially App. Each of these mobile application has been created to promote proper financial habits, 

31 



<!-- Start of picture text -->
11439PM Be V8 i aap 11439Pm Be VS tw sae<br>Grafik Total Transaksi (1M)<br>Kategori Tambah Kategor<br>A Se Be |<br>2024-109 Semua Transaks! | Tambah Transaks |<br>© Tors! Transakst Mp $0.000,00 Tidak ad.<br>aw<br>ae "<br>x Rp 50.000<br>essedf Loo ‘<br>Rata-rata Transaksi per Hari<br>Makan 50.000<br>a ’ =<br><!-- End of picture text -->



<!-- Start of picture text -->
228AMBC&G - US Ftwk’ 2ce 11:43PM 3B @ WS hw ace 11:44PM 3 @ UWS bw sce<br>S cp ce S freon oete } S [ Fresh Date ]<br>Tujuan Keuangan Anda Anggaran [ Tambah Anggaran | Akun<br>Vacation | | i a ao “<br>Terget: Rp 10,000.00 iS | Semus aeTabungan GiteTebungen %<br>Terkumput: Rp 50.000 serrate fp sonan1.480.000 Semua Transaksi<br>Tenggat: 2025-01-01 Tut 31Oct 2024<br>:Rekomendasi tabungan harian: Ro o gp ene0eon Busget/p ’ 1.000000 MakanTabunganenneaen makan - Rp 50.000<br>165.834 per hari untuk 60 hari tersisa sii Teall atts<br>| Tempeh Trenesket Tl Hepue Tuyven | Tidak ada deskrips! Rp 50.000<br>Riwayat Transaksi: 30 Oct 2024 [Hapus|<br>Rp 50.000 2024-10-30 | Hapus |<br>>) eS ] oS 2 re) om) oa = sa ry) o c row ad<br>Home Transaksi Goal Budget Accoun Home Transakei Goal Budget Accour Home Transaksi Goal Budget Account<br><!-- End of picture text -->



<!-- Start of picture text -->
Home Home - Transcations +n _ Stats +f<br>Welcome name1234 Welcome name1234 SWE WE a [sone |<br>~ a a Montnly income Transaction Q perenne<br>a ee a a)<br>—goat o |io Jer to Mer Aer ® fo I:<br>Preceted bd<br>Sw FS e om — -<br>REMINDERS (OMR.430.188 (OMR.187.054 ' OM.Expense 940 —atteene wanna Rage<br>° = @ ont —_<br>co) tect eee ,<br>{udten17/05/2022 toes pameets Metts18/05/2022 erence se=2 | westpeee foe ae i #‘ ne —©param Sreeg<br>— @ vee st ieeser<br>Offers Yo enee Copnee Bet 1 - Gow<br>for You ra ] © teen<br>( \( ) _ pr l Ss hl co ° a ahi o °<br><!-- End of picture text -->



<!-- Start of picture text -->
Offers Reads Profile tr<br>Savings around you Suggested Financial Reads | “ —<br>i 2 test!234@gmail.com<br>Offers in Muscat Financial Articles for your fmancial journey ia<br>hi 4s FINANCEO<br>"3<br>Category Stadent Budgeting ,<br>‘ston On Zzone STUDENTcoe BUDGETING TIPS amaie sonmame<br>Buycrrerree_)2 Get 1 free { StiecorSale 25%-60% == ] . counor7 cian<br>sont at eet dreveraty<br>NationalTechnology Universityof Science and<br><!-- End of picture text -->



<!-- Start of picture text -->
REGISTER AN ACCOUNT<br>First Name:<br>( Financially<br>Login to your account Eman<br>Verify your email address<br>Log In Pane eee: We have sent a verification link<br>—<br>Reegteser:<br>__ [S ]<br><!-- End of picture text -->



<!-- Start of picture text -->
sae[ oxsoet r1em Ko) rs) Motere anvtning me Rp 3.000.000 / month Rp .3.000.000 / month<br>50% DAILY USES (1.500.000) 5 ce: 20);Report42) Period/ a<br>600.000 left. 2/43 / ap<br>Co30% STOCK (1.500.000) ewssomeDonauonoonait S<br>tcome -<br>50% DAILY USES (1.500.000)<br>|><br>7«(Ge e| _* © 7 i pe One<br><!-- End of picture text -->



<!-- Start of picture text -->
a) eS ia Crests, Budget om Create Budget 3<br>ate TRANSACTION20.008 2021-31Sento beeHISTORY2021 noe e - 4 BudgetBudget NameBalance Aewipe anemanioadionlatic<br>Brynfant RooeGon 303.000Seam | = | customweekly” monsiamonthsann is © montha Lust Name:<br>Add Lobe! @ Lee<br>Oops... Looks like you %<br>haven't made a budget, * Emait<br>click here to make one. “ vincentlee@gmail.com<br>~<br>as a= es End Date 31 / 12 / 21 = Re-enter New Password<br>-@QOeei-e@Ouel-& OB e@<br><!-- End of picture text -->

**Table 2.4** Comparison between Similar Applications 

|**Feature /**<br>**Application**|**Android-Based Personal Finance**<br>**Tool (Imawan et al., 2025)**|**Machine Learning Financial App**<br>**(Kamarudeen & Vijayalakshmi,**<br>**2023)**|**Financially App (Imanuel et al.,**<br>**2022)**|**Beruang (Developed Application)**|
|---|---|---|---|---|
|**Overview**|Mobile app for young adults to<br>track income/expenses, set budgets,<br>and monitor financialgoals.|ML-driven app to predict spending,<br>offer discounts, and improve<br>financial literacyfor college students.|Budget-focused app for users to<br>manage expenses, generate reports,<br>and track savings.|A money management app for young<br>adults (18–30) with budgeting tools and an<br>AI chatbot for financial advice.|
|**Characteristics**|- Secure login<br>- Customizable goals<br>- Budget projections<br>- Offline/cloud sync|- Predictive analytics (linear<br>regression)<br>- Student discounts<br>- Financial articles<br>- Real-time Firebase integration|- Budget segmentation<br>- Transaction history<br>- Customer service support<br>- Simple UI|- Manual and automated data entry<br>- 50/30/20 budgeting framework<br>- AI-powered expense categorization<br>- NLP chatbot with personalized advice<br>- Gamification elements|
|**Goal**|Improve financial literacy and<br>resilience through disciplined<br>tracking and planning.|Enhance financial decision-making<br>via ML predictions and educational<br>resources.|Help users achieve financial stability<br>through budgeting and expense<br>control.|Improve users’ financial habits via<br>budgeting tools and AI-driven guidance.|
|**Key Features**|- Income/expense tracking<br>- Goal progress bars<br>- Automated notifications<br>- Financial reports|- Spending predictions<br>- Discount locator<br>- Financial literacy articles<br>- Savings progress tracking|- Budget splitting (% allocation)<br>- Monthly reports<br>- Transaction categorization<br>- Account verification|- Spending dashboards and visual analytics<br>- AI chatbot for personalized tips<br>- Automated expense categorization<br>- Receipt scanning capability<br>- Gamified engagement system|
|**Technology**|Laravel, Flutter, SQLite|Flutter, Firebase, ML libraries|Object-oriented programming|React Native, Firebase, Machine Learning,<br>NLP|
|**Accessibility**|Cross-platform (Android/iOS)<br>Offline mode|Cross-platform (Android/iOS)<br>Needs internet for ML|Mobile app (unspecified OS) Offline|Cross-platform (Android/iOS)<br>Needs internet for AI features.|
|**Target Audience**|Young adults in higher education<br>(ages 19–34)|College students (financial literacy<br>gap)|General users (junior high school and<br>older)|Young adults (18–30) with financial<br>literacy gaps.|
|**Development**<br>**Methodology**|<br>Waterfall model (structured phases)|<br>Agile methodology|<br>Waterfall model|<br>Machine Learning Life Cycle|
|<br>**Evaluation**<br>**Model**|5-point Likert scale|MAE/MSE for ML accuracy|Black Box testing|Black Box testing and UAT|



36 

## **2.5 Justification on Selected NLP Application and Transformer Model** 

The selection of a chatbot, supported by intent classification, as the central NLP application in this project stems from its increasing relevance in improving human-computer interaction through natural conversation. Chatbots are becoming essential in a wide range of services, particularly in customer service, education, and financial advisory, due to their ability to simulate human-like responses and provide instant support. With the integration of intent classification, chatbots are able to understand user goals more effectively, creating a more personalized and accurate interaction. This combination of response generation and user intent understanding enhances the system’s ability to respond with appropriate, informative, and human-like feedback. As user expectations for seamless and intelligent dialogue systems continue to grow, this dual-component approach offers a compelling solution for developing responsive and adaptive applications. 

In this project, the intent classification module plays a crucial role in interpreting user input and identifying the purpose behind user queries. This step is essential in any conversational interface, as it allows the system to comprehend not just the literal words used but the intention behind them. Transformer-based models, such as the MiniLM sentence transformer, are particularly well-suited for this task because of their ability to learn patterns from large datasets, capture semantic embeddings, and adapt to variations in language use with high efficiency and low latency. A MiniLM model trained for classification tasks can be employed in this module to achieve high accuracy in identifying intents and extracting key information or slots from user messages, while maintaining privacy-preserving on-device or local server processing. This ensures that the chatbot can handle diverse queries with precision, supporting a wider range of user needs without relying on rigid rulebased programming. By enabling the chatbot to adapt to different conversational scenarios, the intent classification system contributes directly to the overall intelligence and usability of the chatbot. 

37 

Additionally, text summarization is incorporated as a complementary NLP application to process unstructured financial data, such as receipts or transaction descriptions, into concise, structured insights. Modern summarization techniques, including extractive methods for selecting key elements and abstractive methods for generating novel summaries, enable the system to condense complex inputs like receipt images or bulk transaction text into actionable data points. 

For the task of generating human-like responses, the selection of an xAI Grokbased model as the transformation model was made based on its proven strength in language generation. Unlike models focused on understanding input, Grok is autoregressive and excels at constructing coherent and fluent outputs from a given prompt. Its capability to generate natural-sounding text makes it especially effective for producing advice or suggestions, making the interaction feel less mechanical and more conversational. Grok 4.1 Fast, for instance, has demonstrated few-shot learning abilities, where the model can respond to tasks based on minimal examples provided at runtime. This flexibility is advantageous in chatbot applications, where new and varied user inputs are expected. The ability to generate dynamic and contextually relevant responses supports a more engaging and effective user experience, aligning well with the project’s objectives. 

The combined use of intent classification , text summarization, and Grok-based generation creates a powerful foundation for building advanced chatbots. While intent classification ensures that the system accurately understands what the user is trying to achieve, Grok handles the production of a fluent and meaningful response. Both components benefit from the Transformer architecture, which allows them to manage long-range dependencies in text and operate with high efficiency. Text summarization further supports this by providing structured inputs for categorization and advice generation. This hybrid structure aligns with current best practices in NLP and provides a balanced approach between comprehension and expression. By leveraging 

38 

intent classification , summarization, and Grok, the project is able to deliver a chatbot capable of both understanding and responding effectively, making it a robust solution for natural and intelligent human-computer interaction. 

## **2.6 Conclusion** 

This chapter provided a thorough literature review relevant to the development of a money management mobile application integrated with a personal financing chatbot. It explored foundational concepts in personal finance including budgeting, savings and expense tracking, emphasizing their role in fostering financial literacy and stability among young adults. The chapter also delved into machine learning and natural language processing technologies, highlighting the transformative potential of transformer models such as MiniLM for intent classification and Grok for response generation in chatbot systems. A comparative analysis of existing financial management applications revealed gaps in personalization, real-time tracking and conversational interfaces while underscoring the strengths of predictive analytics and usercentric design. Building on these insights the chapter justified the integration of NLP-driven chatbot capabilities with budgeting tools to address identified shortcomings. By synthesizing these elements, the project aims to deliver a unified mobile application that enhances financial discipline through intuitive AI-driven guidance and interactive financial management features tailored for young adults. 

39 



<!-- Start of picture text -->
RequirementsModel Data Model Application<br>Analysis PreprocessingCollection & SelectionTraining DevelopmentDesign & IntegrationLean  & SELECTUsability DeploymentBonroung &<br><!-- End of picture text -->

The methodology consists of seven phases which are Model Requirements Analysis, Data Collection and Preprocessing, Model Selection and Training, Application Design and Development, Integration and Testing, Usability Evaluation, and Deployment and Monitoring. Comprising these seven phases, the methodology is structured into four overarching stages, which are Requirement Stage, Data-Oriented Stage, Model-Oriented Stage, and Operation Stage. This systematic framework, integral to Machine Learning (ML) lifecycle management, was crucial for ensuring the comparability, traceability, and reproducibility of all generated artifacts throughout the iterative development process (Schlegel & Sattler, 2023). Its adoption aims to provide a clear roadmap for each development stage, simplifying the overall process for the Beruang Money Management Mobile Application with Personal Financing Chatbot and fostering a deep understanding of the project's scope and objectives. 

## **3.2.1 Model Requirements Analysis** 

To begin with, the Model Requirements Analysis phase is the foundational stage of the Machine Learning Life Cycle (MLLC) for the Beruang application. As part of the Requirement Stage, this phase establishes the direction and scope for the ML system and represents a crucial initial step in ML system development (Schlegel & Sattler, 2023). Its main goal is to define the project's scope and outline the essential capabilities the application must deliver. Consequently, this phase ensures a clear direction for development aiming to meet identified user needs and project objectives effectively. Stakeholder requirements and user expectations are identified by reviewing relevant literature and existing research, ensuring the project aligns with best practices in ML, NLP, and chatbot development. 

The deliverables for this phase include the Literature Review Chapter and the Functional and Non-Functional Requirements Document. The Literature Review Chapter is developed through the process of gathering stakeholder 

41 

requirements via literature review, while the system requirements document reflects the capabilities and specifications defined in this phase. 

In terms of specifications, functional requirements include the chatbot’s ability to answer financial questions and provide tailored recommendations, while non-functional requirements include aspects such as performance, security and usability. Furthermore, privacy constraints concerning sensitive financial data are also identified early in the process leading to the requirement for a Hybrid Multi-Model Architecture that processes sensitive data locally. Another key focus is determining the specific machine learning and Natural Language Processing tasks required. This includes deciding on the chatbot's architecture and relevant system components to deliver accurate and personalized responses. For this project, the chatbot integrates the xAI Grok 4.1 Fast model accessed via API to generate conversational responses. Additionally, the Google Gemini 2.5 Flash model is identified as the required solution for highaccuracy Optical Character Recognition (OCR) tasks within the receipt scanning feature. To enhance personalization, the system incorporates a Retrieval Augmented Generation framework which dynamically retrieves userspecific data including demographics and spending patterns and injects this information into system prompts. This allows the chatbot to generate responses grounded in real user context without the need for direct fine-tuning of the Large Language Model. Furthermore, specific requirements for local edge processing are established specifically the need for a Bidirectional LSTM (BiLSTM) model for transaction classification and a MiniLM architecture for intent classification. This ensures the system routes queries appropriately by distinguishing between personalized advice requests and general inquiries without relying solely on cloud connectivity. 

According to Schlegel & Sattler (2023), requirements engineering in ML system development is closely tied to data preparation, modeling and system architecture decisions. Similarly, Kobets & Kozlovskyi (2022) highlight that recent advances in NLP and ML enable more complex data-driven financial 

42 



<!-- Start of picture text -->
| phase Activities Techniques/Software Delivery<br>Model Requirements ; Gather stakeholder j Iteratlrettaviow j Literature Review<br>Analysis requirements Chapter<br>Define project scope ; Project scoping<br>and essential features analysis<br>. . Functional and Non-<br>Requirement analysis functional requirements<br>tools document<br>DeisCla pl s doberkda Defineand Grok/Gemini RAG strategy<br>3 integration<br>Define Intent<br>Classification<br>requirements<br><!-- End of picture text -->

## **3.2.2 Data Collection & Preprocessing** 

The Data Collection and Preprocessing phase is part of the Data-Oriented Stage of the Machine Learning Life Cycle (MLLC) for the Beruang application. As emphasized by Schlegel & Sattler (2023), this phase focuses on collecting and preparing data that enable the effective machine learning system development. The prepared dataset supports the local classification models and the chatbot’s ability to provide personalized financial guidance through RetrievalAugmented Generation (RAG). 

In this project, data collection involves compiling financial and demographic information including user income, expenses, savings patterns, age, and occupation. The dataset is obtained from publicly available financial datasets including the Department of Statistics Malaysia (DOSM) economic benchmarks and is supplemented with synthetically generated data to simulate local Malaysian spending habits. This dataset is structured to support RAG by enabling efficient access to relevant user data during chatbot interactions. To support privacy requirements and address data limitations, this phase also involves generating synthetic datasets specifically designed to train the Bidirectional LSTM (Bi-LSTM) model for transaction categorization and the MiniLM model for intent classification. This includes creating large-scale synthetic samples for transaction data and intent data which are generated through custom algorithmic scripts to ensure relevance to Malaysian financial contexts. In addition, labeled data is prepared to train the intent classifier, which categorizes queries across multiple classes including greeting intents, app navigation queries, and complex financial questions. 

Data preprocessing includes cleaning, normalizing, and handling missing values to ensure dataset quality. Feature engineering is applied to extract meaningful patterns for financial classification, including tokenizing text inputs for the local NLP models. These steps ensure the system can retrieve accurate user information and generate context-aware prompts for the xAI 

44 



<!-- Start of picture text -->
Data Collection & : Collect financial and : Python (Pandas) Structured dataset for<br>Preprocessing demographic data ingestion pipelines system integration<br>Structure dataset for 5 Dataset organization<br>RAG retrieval for RAG<br>Prepare labeled data for : Labeled dataset<br>intent classification preparation<br>Generate synthetic and Custom JavaScript<br>: —_ .<br>anonymized data scripts<br>Clean, normalize, and Data cleaning and<br>handle missing values normalization scripts<br>Apply feature sete<br>engineering for financial ——> ea<br>insights<br><!-- End of picture text -->

meaning no retraining or fine-tuning of the Grok model was performed. Instead, the system focuses on training an intent classification model to categorize user queries and a transaction categorization model to classify expenses, as well as developing retrieval logic that integrates dataset information into chatbot prompts using Retrieval Augmented Generation (RAG). Together, these components allow the chatbot to deliver accurate, personalized financial advice based on user-specific information. 

To begin with, the intent classification model was trained using labelled data prepared during the Data Collection and Preprocessing phase. This model plays a critical role by detecting the type of question a user submits. If the query requires personalized financial advice, the system retrieves relevant user data, such as demographics, income, and spending patterns, which are then incorporated into a structured prompt sent to the Grok API. On the other hand, if the query is classified as a general question, such as seeking definitions or explanations unrelated to personal data, the system either uses predefined responses or send a simplified prompt to Grok without retrieving additional user information. Additionally, a Bidirectional LSTM (Bi-LSTM) model was selected and trained for transaction categorization, enabling the system to classify expenses into categories such as needs and wants based on sequential text data. 

Moreover, a comparative analysis was conducted to evaluate different machine learning models for classification tasks within the system. Alternatives such as neural networks and transformer-based embeddings were compared using performance metrics to determine the most effective approach. In particular, the MiniLM transformer was evaluated for intent classification, while the BiLSTM was optimized for transaction handling. In personal finance management, different machine learning models serve distinct purposes. This process of model evaluation and optimization mirrors established practices in financial machine learning. For example, Bhamare et al. (2025) demonstrated how predictive models like linear regression, decision trees, and random 

46 



<!-- Start of picture text -->
ee ee —<br>MiniLM with<br>Model Selection & Train intent classification Scikit-learn or Trained intent<br>Training model equivalent classification model<br>(TensorFlow.js)<br>categorization9. model.  > BidirectionalGFLSTM)TensorFlow.js withLSTM eategA model.<br>Developfor RAGretrieval promptslogic —_ Custom(JavaScript/Node.js)RAG‘ functionsP —> Fee MEANS.  SHI<br>Evaluate ML models for ) Neural networks, Trained classification<br>classification tasks transformer embeddings models<br>Compare classification ) Performance evaluation ) Performance reports for<br>models using metrics tools model selection<br><!-- End of picture text -->

## **3.2.4 Application Design & Development** 

The Application Design and Development phase belongs to the ModelOriented Stage, where the system’s design is planned, and the machine learning components are integrated into a practical software solution (Schlegel & Sattler, 2023). In this project, development focuses on building both the user interface and backend services to ensure the ML components operate seamlessly within a production environment (M. S. Rahman et al., 2021). Specifically, the money management mobile application includes front-end features such as budgeting tools, gamification elements, and chatbot interaction, alongside back-end services for business logic, database management, and system architecture. 

Although system architecture has been addressed in Section 3.4, further system design and description including diagrams and related explanations, are provided in Chapter 4. 

To begin with, the chatbot was implemented with a conversational user interface supporting text inputs. This interface incorporates the intent classification module, which detects the type of user query and guides system behaviour accordingly. The response process, including the use of Retrieval Augmented Generation (RAG) and structured prompts, has been outlined in the previous phase. As highlighted by Bhamare et al. (2025), a chatbot acts as an interactive front-end to financial systems, providing real-time, personalized insights to users. 

Along with the chatbot, the application also leveraged other essential features, like daily budgeting, expense tracking, receipt scanning, and savings monitoring. These features allowed users to manually input income and expenses or use automated OCR for receipts, which were automatically categorized according to the 50/30/20 budgeting rule. Visual dashboards with elements like the Waterfall Budget Cascade and simple graphs provided users 

48 

with clarity and visualization of their spending habits and allowed users to track their goals. Additionally, a gamification system with Bear Evolution and Experience Points encouraged positive financial behaviours. 

Moreover, development relied on modern and scalable technologies to ensure performance and accessibility. The front-end was built using frameworks such as React Native to deliver a user-friendly mobile interface. Meanwhile, the backend was developed using Express.js (Node.js) servers to manage business logic and integrate machine learning services. The trained intent classification model, RAG retrieval system, and other ML components were deployed as services or embedded within the application using TensorFlow.js for on-device processing. For real-time database storage, authentication, and secure management of user financial data, Firebase was utilized. The budgeting and expense tracking modules interacted with Firebase to ensure that all updates are stored and retrieved properly during user sessions. Receipt scanning integrated Google Gemini 2.5 Flash for OCR extraction. This phase directly supports the project’s second objective by delivering a functioning application that promotes improved financial habits through accessible guidance. 

In conclusion, the working mobile application integrated the ML and NLP components developed in previous phases into a cohesive, user-centric product. Its chat interface allowed users to ask finance-related questions and receive personalized recommendations such as saving tips or spending insights. The budgeting tools and financial tracking features complemented the chatbot by providing users with a full overview of their income and spending behaviour. By focusing on seamless integration and implementation, this phase ensured that the technical components work together as a complete and accessible financial solution. The activities implemented for the Application Design and Development phase are summarized in Table 3.4. 

49 



<!-- Start of picture text -->
Design and build<br>mobile app interface<br>Application Design & with budgeting, .<br>Development expense tracking, iad<br>gamification<br>and chatbot features<br>Firebase and Functional mobile<br>Express.js (Node.js) application interface<br>conversationalImplementUl for ——> Chet interfane. with. ra<br>chatbot interaction CUCSTUINBET ee<br>Integrate intent 5 ,<br>pata Intent model Operational intent<br>classification module to ——> . , —_ vege<br>guide system behavior integration classification module<br>Develop retrieval logic .<br>for RAG to personalize —> Custom BAG retrieval —__» RAGrenhanced prompt<br>Grok prompts u y<br>Implement receipt Google Gemini 2.5<br>scanning features Flash for OCR Gah Toa llc<br>Embed trained ML Testable backend<br>components within the ——» TensorFlow.js —-» functionality for chatbot<br>application and budget features<br><!-- End of picture text -->



<!-- Start of picture text -->
Integrate chatbot<br>Integration and Testing ———> interface with backend ——» _ API connections<br>services<br>Connect intent<br>classification model to ——> intent classitication searsGisela!<br>system logic y od ng<br>Integrate RAG retrieval<br>for personalized prompt ——> raeretrieval<br>generation Ploy<br>Conduct functional, np P<br>performance,security testing and 5 Unit testsane security<br>Test reports for<br>system performance<br>TestRAG.intent routing. and —_ Testrouting scripts;  and for intent prompt<br> data accuracy Validation<br><!-- End of picture text -->

## **3.2.6 Usability Evaluation** 

The Usability Evaluation phase belongs to the Model-Oriented Stage, focusing on assessing system usability and user satisfaction (Schlegel & Sattler, 2023). In this phase, real users were required to complete typical tasks, such as requesting saving tips from the chatbot or recording expenses, while system interaction data were collected. During these interactions, the intent classification model and RAG retrieval operated in the background to ensure responses are accurate and relevant. According to Moon (2024), ML-powered tools assist in analyzing user behaviour and identifying usability challenges efficiently. 

Furthermore, surveys and questionnaires, including Likert-scale forms and the System Usability Scale, were used to gather user feedback and measure usability. These instruments included items designed to assess effectiveness, efficiency, and satisfaction. Based on the research conducted by Ren et al. (2022), chatbot usability studies often focus on these aspects to evaluate system learnability and responsiveness. High user satisfaction and smooth task completion indicated system effectiveness. The activities of the Usability Evaluation phase are summarized in Table 3.6. 

52 



<!-- Start of picture text -->
Conduct real user . a:<br>Usability Evaluation ——> testing withchatbot ——> . He. Scenarios —_ SEE ES usa!bility<br>tasks simulating chatbot use testing sessions<br>Surveys, Likert-scale<br>y Usability Scale<br>Measure effectiveness, Usability metrics a:<br>efficiency, and —_ and system —_ ashen ronnie<br>satisfaction observation tools 9<br><!-- End of picture text -->

intent classification component routes user queries and whether RAG retrieves correct, personalized data for prompt construction. By logging user interactions and system outputs, potential issues such as misrouted queries or incorrect responses could be identified. As discussed by Graham et al. (2025), monitoring real-world chatbot performance is essential for detecting limitations and guiding future improvements. 

In conclusion, while this phase is not implemented in this project, it demonstrates how the system could be evaluated and improved after initial deployment. High retention rates, frequent chatbot usage, and accurate personalized responses would indicate system effectiveness. If monitoring detected problems, such as decreased user engagement or response errors, the system would be updated accordingly to maintain performance. Deployment and monitoring represent the final phase in the Machine Learning Life Cycle, supporting ongoing refinement based on real usage. 

## **3.3 Summary of Project Methodology** 

The summary of the project’s methodology for the development of the Beruang Money Management Mobile Application with Personal Financing Chatbot is presented in Table 3.7. It captures how each of the three main objectives aligns with specific phases of the Machine Learning Life Cycle and details the key activities undertaken as well as the expected deliverables. This clear mapping ensures that every requirement is systematically addressed and that progress can be tracked against tangible outputs. 

Moreover, this structured overview highlights the logical flow from requirement analysis through data preparation, model selection, application design and construction, testing, usability evaluation, and finally to deployment and monitoring. By linking objectives, methodology stages, activities, and deliverables, the table provides a concise roadmap that guides 

54 



<!-- Start of picture text -->
Conduct Literature . .<br>To identify the Review & Identify Heras peview<br>suitable ML and Techniques apter<br>NLP techniques Model Requirements<br>in delivering Analysis (Requirement<br>personalized Stage)<br>financial :<br>recommendations. Define Project Scope & functional requirements<br>System Requirements document<br>Collect Financial &<br>Data Collection; & Demographic Data<br>Preprocessing Structured dataset ready<br>(Data-Oriented Stage) for system use<br>Execute Preprocessing<br>& Feature Engineering<br>To develop a money<br>aesPP vtion mopite Train Intent Intent Classification<br>personal financing Model Selection & Classification Model Model<br>chatbot for promoting Training<br>better money (Model-Oriented Stage)<br>management habits.<br>Train Transaction Transaction<br>Categorization Model Categorization Model<br>Develop RAG Retrieval RAG Retrieval System<br>Logic<br>Evaluate ML Models for Trained Classification<br>Classification Models<br>Compare Classification Performance Reports for!<br>Models using Metrics Model Selection<br><!-- End of picture text -->



<!-- Start of picture text -->
Design Mobile App Functional Mobile<br>Interface & Features Application Interface<br>Application Design &<br>Development<br>(Model-Oriented Stage)<br>Implement .<br>Conversational UI for Proseniasialer<br>Chatbot lassification Module<br>Integrate Intent RAG-Enhanced Prompt<br>Classification Module System<br>Develop RAG Logic for Automated Data Entry<br>Personalized Prompts Feature<br>dos Receipt Testable Backend<br>Scanning Functionality<br>Gemini Flash)<br>Connect chatbot with .<br>backend, intent model, integrated system wth<br>Integration & Testing and RAG prompts working cna<br>(Model-Oriented Stage)<br>Test system<br>performance and Test reports for<br>validate intent system performance<br>and RAG outputs<br>. Completed usability<br>To evaluate the<br>usability of the Collected feedback and<br>developed application Usability Evaluation Collect feedback user satisfaction data<br>in providing (Model-Oriented Stage)<br>accessible financial<br>guidance.<br>ar Usability assessment<br>ay results and insights<br><!-- End of picture text -->

## **3.4 System Architecture** 

The Beruang Application is engineered to provide users with a seamless, secure, and hybrid intelligent financial management experience. The architecture adopts the Model-View-Controller (MVC) design pattern to ensure a clear separation between user interface, system processes, and data storage. This structure significantly improves system maintainability, scalability, and the integration of the Hybrid Multi-Model AI Architecture which strategically distributes workloads between server-side local processing and cloud-based inference. This design reduces unnecessary cloud API calls, optimizes latency and costs, and delivers high-performance personalized financial guidance. As shown in Figure 3.2, the architecture combines mobile technology, server-side machine learning services, and advanced cloud generative AI to deliver personalized financial advice to young adults managing their personal finances. 

57 



<!-- Start of picture text -->
User<br>Interaction —_ Display<br>t- 7— Beruang Application i a<br>|<br>| PRESENTATION LAYER (View) I<br>|<br>)<br>Sr-<br>|<br>& : CIA |<br>| | it | I<br>| Authentication UI Dashboard and<br>| Visualization |<br>|<br>||a<br>VF React Native Hi | |<br>! —_— I<br>= G3}!=<br>|| Data Entry Form Chatbot Interface ,;|<br>I<br>API Request API Response |<br>BUSINESS LAYER (Controller) | ||<br>I<br>|<br>|= = N |<br>|==|<br>eFT) = |<br>|<br>| API Gateway Authentication Service Business Logic Service |<br>| 1 |<br>| Orchestration Return I<br>Advice ;<br>I<br>||©|<br>!<br>|<br>Chatbot Orchestrator |<br>\<br>| Receive Calls NLP Calls LLM |I<br>Query From Service For Service For<br>| App Intent Response ;<br>|<br>|<br>|<br>| Generate |<br>\ Data Acess/ Inference Data / Response Advice!<br>DATA LAYER (Model) || I|<br>I<br>|<br>|U a I<br>|<br>|<br>‘ontex' Machine Learning Service |)<br>| ML Model & Data Store I<br>| Reply: Grok<br>| BpplicsvoniDetabese! TensorFlow Models I<br>(Firebase Firestore) Gontextial<br>| advice and Intent Classifier and |<br>| 1. User Profiles online search Transaction Classifier I<br>I 2. Financial '<br>| 3. ChatTransactionsHistory Knowledge Base ;<br>| 4. Saved Advice Gemini prpertups anc)<br>\ Vision/OCR I<br>| I<br>eee<br><!-- End of picture text -->

The Presentation Layer operates as the View of the system and is responsible for all user interactions through a mobile application developed using React Native. This layer includes key features specifically the Authentication UI for user login and onboarding, Dashboard and Visualization to display financial information using the Waterfall Budget Cascade, Data Entry Forms with Smart Receipt Scanning capabilities, and a Chatbot Interface that allows users to consult the AI Financial Advisor. When a user interacts with any of these features, the mobile application sends API requests to the Business Layer and receives system responses that are displayed on the interface. 

The Business Layer functions as the Controller by managing system processes and coordinating communication between the Presentation Layer and the Data Layer within a Node.js environment. It includes an API Gateway to route requests and a specialized Local Processing Layer that executes TensorFlow.js models directly on the server to minimize latency. This layer hosts the Bidirectional LSTM (Bi-LSTM) Transaction Classifier for automatically categorizing expenses and the MiniLM Intent Classifier to route user queries without external API dependencies. The Gamification Engine also resides within the Local Processing Layer to calculate and update user Experience Points (XP) in real-time based on verified transaction data from the AI classifiers. The chatbot feature is managed by the Generative RAG Pipeline which includes a Knowledge Router to detect if real-time internet access is required and to dynamically switch the Grok model to Online Mode. For visual data processing, the Cloud Vision Controller interfaces with the Google Gemini 2.5 Flash API to perform Optical Character Recognition (OCR) on receipts. When a user submits a query, the Knowledge Router applies intent classification to categorize the input and routes simple interactions locally while complex financial queries proceed to the cloud. Regardless of the intent type, the pipeline performs a Retrieval Augmented Generation process by retrieving relevant domain knowledge passages from the Expert Knowledge Graph. The pipeline then assembles the retrieved information and injects it along with the user-specific Waterfall Budget Cascade status and recent 

59 

transaction history into the System Instruction. The prepared prompt is sent to the xAI Grok 4.1 Fast API to generate context-aware financial advice. 

The Data Layer represents the Model by storing application data and supporting hybrid machine learning operations. Firebase Firestore serves as the primary NoSQL database containing user profiles, financial transactions, budget goals, and chatbot conversation history. A separate Expert Knowledge Graph holds indexed expert financial tips and Department of Statistics Malaysia (DOSM) economic benchmarks used during Retrieval Augmented Generation. During runtime, the chatbot accesses user-specific financial data from Firestore and retrieves domain knowledge from the Expert Knowledge Graph to ensure that responses are accurate, relevant, and grounded in real context. Chat history is stored back into Firestore to maintain conversation continuity. This architecture enables the Beruang Application to provide highperformance financial guidance that is personalized, secure, and computationally efficient. 

## **3.5 Hardware & Software Requirement** 

The development of the Beruang Application required both hardware and software components to support mobile application development, AI system integration, and testing. The hardware includes devices that were used for building and evaluating the system, while the software consists of tools for development, deployment, and project documentation. This section describes the necessary hardware and software that were needed to implement the Beruang Application. 

## **3.5.1 Hardware Requirement** 

The necessary tools used for developing the Beruang Application are identified as the hardware requirements. This refers to the minimum hardware specifications needed to develop, test, and run the mobile application, 

60 

including its AI and NLP features. A laptop with sufficient processing power and memory is required to support code development, integration of machine learning components, and simulation of Android and iOS environments. A mobile device with standard performance levels is required to test the application in real-world usage scenarios. Table 3.8 presents the specifications and descriptions of the hardware planned for this project. 

**Table 3.8** Hardware Requirements 

|**Specification**|**Development Machine**|**Testing Device**|
|---|---|---|
|**Processor**|Intel Core i5 or Apple M1<br>equivalent|Quad-core mobile processor (e.g.<br>Snapdragon 730 or A12 Bionic)|
|**RAM**|8 GB|3 GB|
|**Storage**|256 GB SSD|64 GB|
|**Operating System**|Windows 10/macOS 13 or<br>later|Android 10 or iOS 14 or later|
|**Function**|Used for mobile app<br>development, model<br>integration, and emulation|Used to test app on real device,<br>ensure performance and<br>compatibility|



The development of the Money Management Mobile Application with Personal Financing Chatbot or Beruang Application requires hardware that can support efficient system performance. This is essential as the software and tools used for mobile application development and AI integration demanded adequate hardware capabilities for smooth operation. In this project, a development machine meeting the minimum requirements were used for coding, integrating machine learning features, and testing system functionality. A mobile device with mid-range specifications was used to test and run the Beruang Application during development to evaluate system performance and user experience. 

## **3.5.2 Software Requirement** 

The software requirements form an important part of the development environment as they define the tools that provided the basis for creating and operating the Beruang Application. The software tools that were used had 

61 

different roles but contributed to all phases of development, integration, testing, and deployment. Table 3.9 lists the software needed, along with their descriptions and functions. 

**Table 3.9** Software Requirements 

|**Software**|**Description**|
|---|---|
|**React Native**|Used to develop the mobile application for both iOS<br>and Android platforms with a single codebase.|
|**Visual Studio Code**|Used to write, debug, and manage the source code<br>for the Beruang Application.|
|**Xcode**|Provides the development environment and iPhone<br>Simulator for testing the iOS application.|
|**Firebase**|Offers backend services including real-time<br>database, user authentication, and cloud storage.|
|**Canva**|Used to design user interface mock-ups and visual<br>materials for the application.|
|**Diagrams.net**|Used to draw system diagrams and architecture<br>visuals for the project.|
|**Microsoft Word**|Used to prepare all project documentation.|
|**Mendeley Reference Manager**|Manages research citations and references used<br>throughout writing process of the project report.|
|**TensorFlow.js**|Used to train and run the transaction categorization<br>and intent classification models in the Node.js<br>backend.|
|**Google Generative AI SDK**|Integrates Google Gemini 2.5 Flash for receipt<br>scanning and advanced chatbot reasoning.|
|**Python (Matplotlib/Seaborn)**|Used to generate statistical charts and visualizers<br>for model performance evaluation.|



The listed software tools are critical to the development of the Beruang Application. React Native was used to build the mobile application for both iOS and Android platforms with a shared codebase, ensuring development efficiency. Visual Studio Code served as the primary coding platform, 

62 

supporting system development and integration of AI features such as the personalized chatbot. TensorFlow.js was utilized to train and run the machine learning models directly within the backend. The Google Generative AI SDK facilitated the integration of Gemini Flash for receipt scanning and advanced reasoning. Python libraries were also used to generate statistical charts for model performance evaluation. Xcode was used to run the iPhone Simulator, which allows for application testing without requiring a physical device at every stage. Firebase provided essential backend functions, supporting data storage, authentication, and system scalability. Canva and Diagrams.net assisted in creating design mock-ups and technical diagrams that help visualize project components. Microsoft Word and Mendeley Reference Manager supported project documentation and referencing, ensuring the research and development process is well-organized and properly cited. 

## **3.6 Conclusion** 

In conclusion, this chapter provided a clear overview of the project methodology, which follows the Machine Learning Life Cycle (MLLC) as a guide to develop the Beruang Application. This chapter discussed in detail the phases of the MLLC, thereby outlining the foundational stages involved in developing an AI-supported mobile application with a financial assistant conversational entity. The system architecture has also been explained, providing an understanding of how the Beruang Application is structured and how all its components interacted with one another with the Model-ViewController (MVC) paradigm. Moreover, this chapter has provided thorough definitions of the hardware and software resources required for this project, confirming that the required resources and tools are readily available to allow for development of the system, integration of AI models, and completion of testing and maturity processes. This thorough explanation provides solid foundation in preparation for the next stage of system development. 

63 

## **CHAPTER 4** 

## **PROJECT DESIGN, IMPLEMENTATION AND RESULT** 

## **4.1 Introduction** 

This chapter details the design, implementation, and evaluation of the Beruang mobile application. It documents the system architecture that integrates suitable Machine Learning and Natural Language Processing techniques, including a hybrid model utilizing TensorFlow.js, Google Gemini, and xAI Grok. The chapter further outlines the technical development of the application's core features, such as budgeting tools, receipt scanning, and the personal financing chatbot, which together aim to promote better financial management habits. Finally, it presents the methodology and results used to evaluate the system's functionality, AI performance, and overall usability in delivering accessible financial guidance. The following sections present the system design, development process, and outcomes that demonstrate the transformation of initial requirements into a functional software solution. 

## **4.2 System Design** 

The system design phase translates the requirement specifications into a blueprint for construction. This section presents the visual and structural architecture of the Beruang application, documenting the user experience through storyboards and system flowcharts, the functional requirements via use case modeling, the logical data relationships within the database, and the technical pipeline for the integrated AI services. 

64 



<!-- Start of picture text -->
8 Create Account @00000000<br>Email Your Name?<br>Password<br>Ea<br>Sign Up<br>Login$creen SignUpScreen OnboardingScreen<br>Hi, User a<br>RM 2,500<br>+ $ <<br>Budget<br>=m<br>ball<br>HomeScreen<br>Saved Tips merce Savings Goal Add Expense Beruang Al Notifications<br>* Strategy... fe] Hello! Help? BAe.<br>. ‘Svrategy.... RMSk/ RM 10 RM 0.00 Can| afford? AB Aer...<br>» satay Transactions (ma) (a) @ Am.<br>‘Type message... [>]<br>SavedAdviceScreen ExpensesScreen SavingsScreen AddTransactionScreen ChatbotScreen NotificationsScreen<br>Add Income Privacy<br>RM 0.00 User Name ©<br>Lwi51500 XP Protected<br>Settings<br>Option><br>Option><br>Option > Export Data<br>Sign Out<br>AddMoneyScreen ProfileScreen PrivacySecurityScreen<br><!-- End of picture text -->

The flow begins with the Authentication Layer, where the user starts at the LoginScreen or SignUpScreen. Upon successful authentication, new users are directed to the OnboardingScreen to establish their unique financial profile through a 9-step wizard capturing income, occupation, financial aims, and spending obstacles. Following authentication, the user enters the Main Hub Layer where the HomeScreen serves as the central navigation point displaying real-time budget overviews with the Waterfall Budget Cascade visualization. 

The Features Layer provides access to core financial management capabilities. Users can navigate to the ExpensesScreen for detailed transaction history with category filtering and visual breakdowns, or manage their long-term objectives in the SavingsScreen with goal progress tracking. The AddMoneyScreen facilitates income recording, while the AddTransactionScreen enables expense logging with a fully integrated camera interface for automated receipt scanning via OCR. The ChatbotScreen provides AI-driven personalized financial advice through a conversational interface with real-time streaming responses. 

The Settings Layer contains user preference and account management screens. The ProfileScreen displays user statistics and gamification progress, the SavedAdviceScreen stores bookmarked tips from the chatbot, the NotificationsScreen shows smart budget alerts, and the PrivacySecurityScreen enables data export and account deletion. The diagram confirms that the application architecture is relatively flat, minimizing deep nesting to ensure that critical financial actions are never more than two taps away. 

## **4.2.2  User Interaction Storyboard** 

A detailed narrative storyboard was created to validate the application's practical utility by depicting an end-to-end user journey. The storyboard illustrates real-world interaction, highlighting the integration of receipt scanning, gamification, and AI consultation through the scenario of "Yusuf," a Malaysian university student. His journey begins with the Foundation phase 

66 



<!-- Start of picture text -->
1. Setup: Defining Financial Baseline 2. Action: Capturing real-world 3. Processing: Hybrid Al Model extract<br>and long-term goals spending effortlessly via Al vision and classify data instantly<br>¢ faa Money<br>ss! 3325.00 = RMGemini extracted OCR:<br>ee —— ies to _) Bi-LSTM: Classified<br>as “Wants/Food”<br>; :<br>+. <=> e<br>4. Feedback: Instant Gamified rewards 5. Consultation: Asking complex financial 6. Al provides personalized advice<br>and real-time budget viusalization question to the context-aware Al that improves financial behaviour.<br>€ New Chat 1c} - Nah Yusuf, concert ticketsni ‘Wants’<br>18 Level Upt You reached Level 2 — “19 Wants). Kala bel big XP deduct & lambat eS<br>axel bedWantssavings (20%)(20%)dk eyN> << lagiEmergela, 22hbFu dni n  dah dekat payday!cykau. Tunggu allowance@B<br>3 enerating response, Do you want me to provide info based on<br>your budget?<br>a<br><!-- End of picture text -->



<!-- Start of picture text -->
Lo ____BeruangApp System |<br>Log Income<br>Ke |<br>| |<br>psec<br>mt<br>| Al Modules<br>||<br>|<br>User RAG Context |<br>Track Bear Level<br>Update Goals<br>| | Backend API<br>||<br>!|<br>| |<br>Lb. eee ese eee ea ee se ee essi'l<br><!-- End of picture text -->



<!-- Start of picture text -->
™ & Ci<br>Savings<br>intry Method? Select Mission Type Query<br>Manual Sei<br>pias<br>Query?<br>O Yes<br>Bi-LSTM Gemini Vision Cloud<br>—<br>Beruang Display Response<br>Database<br>Cale Reward (XP) —,<br><!-- End of picture text -->

The flow begins when a user initiates a transaction entry. The system first evaluates the transaction type. Income entries (Add Money) bypass the AI model and are written directly to the database to preserve computational resources. For expenses, if the user selects the manual entry option, the data flows directly to the server-resident Bidirectional LSTM (Bi-LSTM) model. This model employs a multi-head output architecture to simultaneously predict both the high-level Category and the specific Subcategory. Conversely, if the user selects the receipt scan option, the image is captured and transmitted to the Vision Controller. This controller subsequently invokes the external Gemini 2.5 Flash API to extract structured data, specifically the transaction amount and a classifier-friendly description, before returning it to the user for final confirmation. Upon any successful transaction logging, the flow triggers the Gamification Engine to calculate Experience Point (XP) rewards, reinforcing positive financial habits. Additionally, the Bulk Import feature utilizes the same Gemini API engine to parse unstructured text from clipboards into structured transaction lists. 

For the Chat Interaction, the process follows a hybrid classification and RAG path. To optimize latency, a local BERT-based intent classifier filters queries first, handling simple app interactions locally while routing complex financial questions to the cloud. For cloud queries, a 'Knowledge Router' detects if realtime internet access is required, dynamically switching the Grok model to Online Mode. Initially, the user sends a query which triggers the backend to retrieve the current budget status of the user, specifically the needs, wants, and savings distribution, along with their recent transaction history. This context is then injected into the System Instruction. Finally, the Grok 4.1 Fast Large Language Model generates a context-aware response which is rendered on the mobile chat interface. The flowchart explicitly shows error handling loops, such as when the receipt scan returns low-confidence data, causing the system to revert to a manual review state to ensure data integrity. 

70 



<!-- Start of picture text -->
TRANSACTIONS SAVED_ADVICES<br>es [| | users es<br>amount email FK | relatedChatld<br>category name text<br>subCategory state createdAt<br>description monthlyIncome<br>date financialGoals<br>type financialSituation CHAT_SESSIONS<br>totaiXP CsCe<br>tracks avatar initiates q FK {uid<br>title<br>MONTHLY_BUDGETS createdAt<br>FK income;|uid Sf i :<br>needsAllocation FK | chatld S<br>text<br>wantsAllocation<br>savingsAllocation. , sender<br>createdAt<br>needsSpent<br>wantsSpent<br>savingsSaved<br><!-- End of picture text -->



<!-- Start of picture text -->
| Client Layer<br>|| Chat Mott 7<br>| 1<br>EE a ea<br>cae He<br>| Local Processing Layer :<br>UpdateXP<br>| MiniLM (Intent Expense Action<br>| Classifier) : Scan<br>'<br>| Local intent Bi-LSTM ~~<br>| Local Response<br>| (Knowledge Base)<br>omplewOOD<br>L Se ee oe<br>| Cloud / RAG Layer<br>|<br>|<br>|<br><!-- End of picture text -->

The Local Processing Layer utilizes a dual-model approach featuring a customtrained Bidirectional LSTM for transactions and a specialized Transformerbased model for intent classification, both running locally within the Node.js environment. This layer also hosts the Gamification Engine which computes real-time Experience Points. Complementing this is the Cloud Vision Layer where the Receipt Recognition Module and Bulk Import Parsing are powered by Google Gemini 2.5 Flash. Finally, the Generative RAG Layer drives the Personal Financial Chatbot using the xAI Grok 4.1 Fast Large Language Model, enhanced by an intelligent Knowledge Router and context injection from user data and expert knowledge. 

## **4.3 System Development: AI & Backend Services** 

This section presents the technical implementation of the Beruang application's artificial intelligence modules and backend infrastructure. The development encompasses data preparation pipelines for transaction classification, intent recognition, and expert knowledge extraction. Each component was designed to operate efficiently on a Node.js server while maintaining low inference latency for real-time mobile application interactions. 

## **4.3.1  Development Environment & Tech Stack** 

The Beruang Application backend infrastructure was developed using a modern JavaScript technology ecosystem. The complete technology stack is summarized in Table 4.1. 

**Table 4.1** Backend Technology Stack 

|**Component**|**Technology**|**Version**|**Purpose**|
|---|---|---|---|
|**Runtime**|Node.js|20.x LTS|Server-side JavaScript execution|
|**Framework**|Express.js|5.1.0|RESTful API routing and<br>middleware|



73 

|**ML Framework**|TensorFlow.js Node|4.17.0|Local model training and<br>inference|
|---|---|---|---|
|**NLP Pipeline**|Xenova Transformers|2.17.2|MiniLM sentence embeddings|
|**Cloud Database**|Firebase Admin|13.6.0|Firestore real-time database|
|**LLM Provider**|OpenAI SDK|4.20.1|xAI Grok 4.1 Fast integration|
|**Vision AI**|Google Generative AI|0.24.1|Gemini 2.5 Flash receipt OCR|



The production backend is deployed on Render.com as a web service with automatic scaling. During server initialization, all TensorFlow.js models are loaded into memory to minimize inference latency. 

## **4.3.2  Data Preparation and Preprocessing** 

The Beruang application requires three distinct datasets to power its AI capabilities. The transaction classification model uses a synthetically generated dataset of Malaysian financial transactions. The intent classification model uses a comprehensive dataset of user query patterns. The RAG chatbot relies on expert financial knowledge extracted from Malaysian YouTube educators. 

### **a) Transaction Dataset Generation** 

The transaction classification dataset was generated programmatically using a custom Node.js script that integrated Malaysian financial vocabulary with systematic data augmentation. Realistic transaction descriptions were constructed by combining terms from multiple categories: Malaysian food items like nasi lemak and teh tarik, local brands such as Petronas, Maybank and Shopee, Malay language terms including bayar and beli, and multi‑ethnic personal names. The final dataset comprises 220,152 unique samples with a balanced distribution of 54.61% Needs and 45.39% Wants. The vocabulary contains 2,142 unique tokens and an average description length of 3.96 words. A typo simulation function applied data augmentation with 35% probability, 

74 

introducing realistic spelling errors through character swaps, deletions and duplications. This ensures the trained model maintains accuracy when processing real‑world user input containing natural typing errors. 

### **b) Intent Dataset Generation** 

The intent classification dataset was designed to train a query router that directs user inputs either to local predefined responses or to the Grok LLM for complex financial analysis. It comprises 114,270 samples across 56 distinct intent categories, including greetings, app navigation, financial definitions and complex advisory requests. These samples are organized into three routing categories: complex advisory with 59,411 samples requiring LLM processing, local response with 50,982 samples answerable by predefined responses, and invalid input with 3,877 nonsensical samples. A privacy‑aware routing mechanism ensures that personal financial queries containing keywords such as "my spending", "my budget" or "analyze my" are explicitly labeled for complex advisory processing, guaranteeing they receive RAG‑augmented responses rather than generic local answers. 

### **c) Expert Knowledge Base Preparation** 

The chatbot's expert knowledge base was curated by manually transcribing educational content from 10 Malaysian financial YouTuber videos, including channels such as Dr. Adam Zubir. Topics covered debt management using Snowball and Avalanche methods, investment comparisons between ASB and Tabung Haji, car purchasing decisions, wedding budgeting strategies and the 50/30/20 savings rule. Raw transcriptions were processed into structured JSON format containing 388 individual advice entries, each with a topic field for keyword matching, an advice field with actionable guidance and a type field categorizing advice as Tip, Fact, Warning or Comparison. Additionally, official economic data from the Department of Statistics Malaysia was preprocessed to provide state‑specific financial context for all 16 Malaysian states, including 

75 

mean income, median income, poverty rate and Gini coefficient for each region. 

## **4.3.3  Implementation of AI Classification Modules** 

The Beruang application implements two local classification models that run entirely on the backend server without external API dependencies. This architecture ensures low latency responses, zero per-inference costs, and complete data privacy for sensitive financial information. 

### **a) Bi-LSTM Transaction Classification Service** 

The transaction classification service automatically categorizes user expenses into the 50/30/20 budget framework. The model receives a transaction description as input and simultaneously predicts both the primary category of Needs or Wants and a detailed subcategory such as Food and Beverage, Shopping, or Transportation. 

The model architecture uses a Bidirectional Long Short-Term Memory neural network with a multi-head output design. The bidirectional structure processes transaction descriptions in both forward and reverse directions, capturing contextual relationships that improve classification accuracy. The architecture consists of a 64-dimensional embedding layer, two Bi-LSTM layers with 64 and 32 units respectively, 30% dropout for regularization, and separate softmax output heads for category and subcategory prediction. Figure 4.7 presents the model definition code from the transaction model training script. 

76 

function createGeniusModel() { const input = tf.input({ shape: [CONFIG.maxLen] }); const embedding = tf.layers.embedding({ inputDim: CONFIG.maxVocabSize, outputDim: CONFIG.embeddingDim, inputLength: CONFIG.maxLen, maskZero: true }).apply(input); const lstm1 = tf.layers.bidirectional({ layer: tf.layers.lstm({ units: 64, returnSequences: true, dropout: 0.3 }) }).apply(embedding); const lstm2 = tf.layers.bidirectional({ layer: tf.layers.lstm({ units: 32, returnSequences: false }) }).apply(lstm1); const categoryOutput = tf.layers.dense({ units: 2, activation: 'softmax', name: 'category_output' }).apply(dense); const subcategoryOutput = tf.layers.dense({ units: 8, activation: 'softmax', name: 'subcategory_output' }).apply(dense); return tf.model({ inputs: input, outputs: [categoryOutput, subcategoryOutput] }); <u>}</u> 

**Figure 4.7** Bi-LSTM Multi-Head Model Architecture 

The model was trained for 100 epochs with early stopping and achieved 99.61% accuracy on the test set of 50,086 samples. The Needs category achieved 99.70% precision and 99.59% recall, while the Wants category achieved 99.51% precision and 99.64% recall, resulting in an overall weighted F1-Score of 0.9961. 

### **b) Intent Classification Service (MiniLM)** 

The intent classification service routes user chatbot queries to the appropriate handler. Simple queries such as greetings and app navigation requests receive instant local responses, while complex financial questions are forwarded to the Grok LLM for personalized analysis. 

The architecture uses a two-stage pipeline. First, the MiniLM sentence transformer generates a 384-dimensional semantic embedding of the user 

77 

query. Then, a feed-forward neural network with 256 and 128 unit dense layers classifies the embedding into one of 56 intent categories. Dropout rates of 40% and 30% are applied for regularization. Figure 4.8 shows the inference implementation with Out-of-Distribution detection from the intent classification service module. 

async function predictIntent(message) { const output = await intentExtractor(message, { pooling: 'mean', normalize: true }); const embedding = tf.tensor2d([Array.from(output.data)]); const prediction = intentModel.predict(embedding); const probabilities = prediction.dataSync(); const maxProb = Math.max(...probabilities); const OOD_THRESHOLD = 0.5; if (maxProb < OOD_THRESHOLD) { return { intent: 'COMPLEX_ADVICE', confidence: maxProb, isOOD: true }; } const predictedIntent = intentMetadata.labelMap[ probabilities.indexOf(maxProb) ]; embedding.dispose(); prediction.dispose(); return { intent: predictedIntent, confidence: maxProb, isOOD: false }; <u>}</u> 

**Figure 4.8** Intent Prediction with OOD Detection 

The model was trained for 25 epochs and achieved 99.62% validation accuracy with a Macro F1-Score of 0.9946 across all 56 intent categories. When the maximum prediction probability falls below the 0.5 threshold, the query is classified as Out-of-Distribution and automatically routed to the Grok LLM. This hybrid architecture reduces API costs by handling common queries locally while ensuring complex questions receive appropriate LLM processing. 

### **c) Computer Vision & OCR Service (Gemini)** 

The Computer Vision and Optical Character Recognition module utilizes the Google Gemini 2.5 Flash multimodal model to transform unstructured image and text data into structured financial records. A critical technical innovation in the receipt scanning implementation is the generation of classifier-friendly 

78 

descriptions. Instead of merely performing raw transcription, the system employs prompt engineering to synthesize concise summaries such as converting a raw "Big Mac Set" receipt into "McDonalds Burger Meal". This standardized output ensures that the downstream Bi-LSTM transaction classification service can accurately categorize scanned expenses. 

The model also powers a bulk import capability designed to parse unstructured text from external sources such as spreadsheets or notes. This functionality handles natural language irregularities and automatically corrects common Malaysian abbreviations during the extraction process. Figure 4.9 presents the vision service implementation, capturing the utilization of the Gemini API and the specific prompt structure used to enforce strict JSON output formatting. 

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5flash:generateContent?key=${GOOGLE_API_KEY}`; async function scanReceipt(base64Image) { const prompt = ` Analyze this receipt image and extract details in STRICT JSON format. Extraction Logic: 

1. Merchant: Look for the business/shop/stall name at the very TOP. 

2. Description: Create a SHORT, classifier-friendly summary: 

- Combine the FOOD TYPE or BRAND with a simple category word. 

- Examples: "Ayam Gepuk Meal", "Starbucks Coffee", "Pharmacy Medicine". 

- Do NOT list every item. Describe the purchase in 2-4 words. JSON Structure: { "amount": number, "merchant": "string", "description": "string", "date": "YYYY-MM-DD" } `; const response = await axios.post(url, { contents: [{ parts: [ { text: prompt }, { inlineData: { mimeType: "image/jpeg", data: base64Image } } ] }] }); return JSON.parse(response.data.candidates[0].content.parts[0].text); <u>}</u> 

**Figure 4.9** Gemini Vision Service with Prompt Engineering 

79 

## **4.3.4  Implementation of Generative AI (RAG) Pipeline** 

The Retrieval-Augmented Generation pipeline enhances the chatbot's responses by injecting real-time user context and curated knowledge into the LLM prompt. This architecture enables personalized financial advice that considers the user's actual spending patterns, budget status, and demographic profile rather than providing generic recommendations. 

### **a) RAG Knowledge Router & Online Detection** 

The Knowledge Router determines whether a query should be processed offline using local context or forwarded to the web-enabled Grok model. The router implements a five-layer detection system: Safety Layer forces queries with personal keywords such as "my spending" or "my budget" offline to protect sensitive data; Discovery Layer detects time-sensitive or price-related queries; Action Layer captures patterns such as "how to order"; Lifestyle Layer handles shopping and brand queries; and Explicit Command Layer allows manual triggers such as "search" or "cari". Figure 4.10 presents the Privacy Guard implementation. 

function detectOnlineQuery(message) { const lowerMsg = message.toLowerCase(); const privacyKeywords = [ 'my spending', 'my budget', 'my transaction', 'my money', 'my expense', 'my income', 'my savings', 'analyze my' ]; const isPrivateQuery = privacyKeywords.some(kw => lowerMsg.includes(kw)); if (isPrivateQuery) return false; // Force OFFLINE const shouldGoOnline = hasOnlineKeyword || isLocationQuery || hasActionPattern || hasExplicitCommand; return shouldGoOnline; } 

**Figure 4.10** Privacy Guard Implementation 

80 

### **b) Dynamic Context Retrieval (Waterfall & Expert Tips)** 

The context retrieval system assembles a prompt augmentation package including user profile, budget breakdown, transaction summaries, expert tips, DOSM data, and app manual. The Waterfall Budget Cascade calculates overspending patterns: when Wants exceeds its allocation, the system determines how much overflow was absorbed from Needs and how much spilled into Savings. This information is injected into RAG context so the LLM acknowledges the user's actual financial position. 

Expert tips retrieval uses a keyword search index built at startup from 388 curated tips. The system scores tips by keyword matches and returns the top three for prompt injection. Figure 4.11 shows the cascade calculation. 

function formatBudgetForRAG(budgetData) { const wantsOverflow = Math.max(0, budgetData.budget.wants.spent - budgetData.budget.wants.target); if (wantsOverflow > 0) { const needsBuffer = budgetData.budget.needs.target - budgetData.budget.needs.spent; const absorbedByNeeds = Math.min(wantsOverflow, needsBuffer); const absorbedBySavings = Math.max(0, wantsOverflow - absorbedByNeeds); return `Wants spilled RM ${absorbedByNeeds} into Needs, RM ${absorbedBySavings} into Savings.`; } return 'No overflow detected.'; } 

**Figure 4.11** Waterfall Budget Cascade Calculation 

### **c) xAI Grok Integration & Prompt Engineering** 

The LLM service integrates with xAI Grok 4.1 Fast through OpenRouter API. It dynamically switches between "x-ai/grok-4.1-fast" for offline queries and "x-ai/grok-4.1-fast:online" for web-enabled queries based on the Knowledge 

81 

Router decision. The comprehensive system instruction governs chatbot behaviour including visual output rules for spending widgets, 50/30/20 overflow enforcement, Financial Guardian Mode with Malaysian food categorization, and Supercharged Advice Pillars covering Survival Units, Opportunity Cost, Localized Context, Behavioural Nudging, and Time Sensitivity. Figure 4.12 presents the streaming implementation. 

async function streamChat(messages, options = {}) { const isLocationQuery = options.isLocationQuery || false; const model = isLocationQuery ? "x-ai/grok-4.1-fast:online" : "x-ai/grok-4.1-fast"; return await openAI.chat.completions.create({ model: model, messages: [{ role: 'system', content: SYSTEM_INSTRUCTION }, ...messages], temperature: isLocationQuery ? 0.1 : 0.5, max_tokens: 800, stream: true }); } 

**Figure 4.12** Grok Streaming with Dynamic Model Selection 

## **4.3.5  Backend API & Logic Layer** 

The backend follows the Model-Service-Controller pattern, separating data access, business logic, and HTTP handling for independent testing and maintainability. 

### **a) Scalable RESTful API Architecture** 

The API layer uses Express.js with centralized routing defining six endpoints which are health check, streaming chat, non-streaming chat, transaction classification, receipt scanning, and bulk import. The streaming endpoint uses 

82 

Server-Sent Events with headers for text/event-stream, no-cache, and keepalive, plus a 15-second heartbeat for connection maintenance. 

Server initialization loads knowledge base data and both TensorFlow.js models into memory, then performs warmup inference to eliminate cold-start latency. Figure 4.13 presents the routing configuration. 

const router = express.Router(); const chatController = require('../controllers/chatController'); const visionController = require('../controllers/visionController'); const transactionController = require('../controllers/transactionController'); router.get('/health', (req, res) => res.json({ status: 'online' })); router.post('/chat/stream', chatController.streamChat); router.post('/chat', chatController.chat); router.post('/predict-transaction', transactionController.predict); router.post('/scan-receipt', upload.single('image'), visionController.scanReceipt); router.post('/import-data', visionController.importData); 

**Figure 4.13** API Routes Configuration 

### **b) Security & Authentication Implementation** 

The authentication layer uses Firebase Authentication with email and password credentials. The mobile client initializes Firebase Auth with React Native AsyncStorage persistence, ensuring that user sessions survive app restarts without requiring re-authentication. All API keys for external services including OpenRouter, Google Generative AI, and Tavily are stored as environment variables loaded via dotenv, preventing credential exposure in the codebase. 

Data security is maintained through Firestore security rules that restrict document access to authenticated users matching the document's userId field. The backend does not store user credentials locally and relies entirely on Firebase's managed authentication infrastructure for identity verification. 

83 

## **4.3.6  Mobile Application Development (Frontend)** 

The Beruang mobile application was developed using React Native, enabling cross-platform deployment to both iOS and Android from a single codebase. The frontend architecture emphasizes real-time data synchronization with the backend and a gamified user experience to encourage consistent financial tracking behaviour. 

### **a) React Native Component Architecture** 

The application consists of 13 primary screens organized using React Navigation's native stack navigator. The screens include LoginScreen and SignUpScreen for authentication, OnboardingScreen for user profiling, HomeScreen as the main dashboard, AddTransactionScreen and AddMoneyScreen for data entry, ChatbotScreen for AI interactions, ExpensesScreen and SavingsScreen for financial tracking, and ProfileScreen, NotificationsScreen, and PrivacySecurityScreen for user management. 

The component structure follows a modular pattern with reusable components stored in a dedicated components directory. Key components include SmartWidget which dynamically renders four widget types based on JSON data from the chatbot: spending summary charts, trip itineraries, goal progress bars, and daily transaction lists. Figure 4.14 presents the SmartWidget implementation. 

export const SmartWidget = ({ dataString }) => { let data = JSON.parse(dataString); return ( <Animated.View style={[styles.container, animatedStyle]}> {data.t === 's' && <SpendingSummaryWidget data={data} />} {data.t === 'i' && <ItineraryWidget data={data} />} {data.t === 'g' && <GoalProgressWidget data={data} />} {data.t === 'd' && <DailyTransactionsWidget data={data} />} </Animated.View> ); <u>};</u> 

**Figure 4.14** SmartWidget Dynamic Rendering 

84 

### **b) Real-Time Data Synchronization & SSE** 

The application implements real-time data synchronization through two mechanisms. Firestore onSnapshot listeners provide instant updates for transactions, chat sessions, and messages whenever data changes in the cloud database. This enables multi-device synchronization where changes made on one device appear immediately on others. 

For chatbot responses, the application uses Server-Sent Events via the reactnative-sse library to receive streaming tokens from the backend. The ChatbotScreen component processes incoming tokens character-by-character, updating the displayed message in real-time to create a typing effect. A blinking cursor animation provides visual feedback during streaming, and the SmartWidget parser detects and renders JSON widget blocks as they complete within the stream. 

### **c) Interactive Visualization & Gamification UI** 

The gamification system rewards users with experience points for positive financial behaviours and applies penalties for overspending. Users earn 50 XP for logging transactions, 2 XP per RM1 saved, 100 XP per chat session, and 20 XP for daily check-ins. Penalties include minus 250 XP for category overflow between Needs and Wants, and minus 500 XP for dipping into savings. 

The level progression system spans 13 levels at 500 XP per level, with each level unlocking a new bear avatar that evolves from a basic design to increasingly elaborate forms. Figure 4.15 presents the XP reward constants from the gamification utility module. 

85 

export const XP_PER_LEVEL = 500; export const MAX_LEVEL = 13; export const XP_REWARDS = { TRANSACTION_LOGGED: 50, SAVING_RM1: 2, CHAT_SESSION: 100, DAILY_CHECKIN: 20, CATEGORY_OVERFLOW_PENALTY: -250, SAVINGS_DIP_PENALTY: -500, }; 

**Figure 4.15** XP Reward Configuration 

The HomeScreen displays a mini budget dashboard with color-coded progress bars for Needs, Wants, and Savings categories. Warning indicators appear when categories receive overflow from overspending, and tapping the indicator provides detailed explanations of the budget cascade. The financial calculations use a dedicated utility module that computes budget allocations, waterfall overflows, and cumulative savings across all time periods. 

## **4.4 Implementation Output** 

This section presents the key user interface screens of the Beruang mobile application, demonstrating how the AI and backend services are exposed to end users through intuitive mobile interfaces. 

## **4.4.1 Onboarding and Profiling Interface** 

The onboarding flow guides new users through a 9-step profiling wizard organized into three logical groups: Identity, Lifestyle, and Goals. The Identity group collects the user's name and age, with age validation restricting access to users between 18 and 30 years old to match the target demographic of young Malaysian adults. The Lifestyle group captures the user's Malaysian state of residence from a grid selector displaying all 16 states and federal territories, occupation with quick-select suggestions, and monthly income with a Ringgit 

86 



<!-- Start of picture text -->
12:34 ? 12:34 ? 12:35 r+<br>< = < — < —s<br>? vd<br>Full Name? Residencing State? Primary Aim?<br>aiman Johor Kedah Watenten Build Emergency Fund<br>Settle All Debts<br>— a a Save for Marriage/House [v)<br>seers<br>qwertyuioop2 Others (specify)<br>a) (s) (qd) |f) fg) th) i) ik<br>oo ZkKievbam @<br>23 @ space return CONTINUE > CONTINUE ><br>® g<br><!-- End of picture text -->



<!-- Start of picture text -->
12:43 Pit<br>4<br>€ Add Expense<br>2 Manual Entry<br>|<br>a<br>Fie <4a<br>“TAL PLKAHAX XX BATERI20 4 RK 3.95,<br>€002 SHALL CHILLY 1006 bol 2.30<br>cy AI =<br>Paste from Excel/Notes<br><!-- End of picture text -->



<!-- Start of picture text -->
1:02 bh > iF<br>¢ Add Expense<br>Bulk Import x<br>3 Items Imported!<br>= grab ke kicc 1<br>~ beli baju cotton on 7<br>mw<br>XP Gained!<br>+30 XP<br>Sean Gallery<br>NET XP +30 XP<br>Process with Al 4 fle Paste from Excel/Notes<br><!-- End of picture text -->



<!-- Start of picture text -->
1:06 ond 1:07 > it<br>€ New Chat (©) € Check my balance [C}<br>History<br>© Check my balance<br>Your available balance is RM635.77 Ey Recent expenses<br>(Needs RM277 + Wants RM359<br>remaining). Here's this month's spending: ©  'mlooking at my expen.<br>me<br>28% Spending Review © hello<br>O akunak pi bercuti ke pe.<br>® Needs RM 337.00<br>@ Start New Chat<br>Beruang Al Assistant . O Wants RM 10.00<br>© Savings RM 0.00<br>Check my balance Any saving tips? Recent e» is3. Generatingscien responseinlitt<br><!-- End of picture text -->



<!-- Start of picture text -->
1:14 Pres 1:15 > Fit 15 > Fit<br>Hello, test! ” (3) € Notifications G & Savings<br>January Balance Qo 'Y Savings Goal Achieved! TOTAL SAVINGS<br>° ——<_ RM 20.00 os<br>RM 10.00.<br>RM 100.00: RMBx  70.00 ¥ ‘ve hit your saving mission! Great job! @<br>Addmoney --AddTranssetion Saved Advice<br>Goal Breakdown REAL-TIME<br>Total Savings Budget Breakdown<br>RM 20 Needs( mn a“<br>EE RM 100.00 RM 20.00 RM 20.00<br>Check Progress ><br>too fmaM 20.0020.00<br>Recent Transactions. —*{*—<«—> EE<br>wa. | Monthly Savings -RM20.00 © Goal Reached!<br>TS Your future self says thank you! &8<br>a O Why have these targets?<br><!-- End of picture text -->



<!-- Start of picture text -->
1:08 > Fit 4:10 > iF 4:10 7H<br>€ Expenses < Expenses € Expenses<br>© @ woe<br>100%——— Spent 0% Left<br>RM 30.00 ~ mn<br>RM 44.00<br>RM 151.10<br>RM 14.00 Edit Transaction<br>'<br>ont ow<br>anal Se RM 10.00<br>Fy "1<br>Recent Transactions uy Recent Transactions '<br>CS) © Es<br><!-- End of picture text -->

## **4.5.1  Functional System Testing** 

Functional testing was conducted to verify that all system components operate correctly under normal usage conditions. The testing covered the complete user journey from authentication through financial tracking and AI interactions. 

The authentication module was tested for successful login and signup flows, password validation, and session persistence across app restarts using Firebase Auth with AsyncStorage. The onboarding wizard was verified to correctly save all nine profiling fields to Firestore and enforce age validation between 18 and 30 years. 

Transaction management testing confirmed that manual expense entry correctly triggers the Bi-LSTM classification API and receives accurate category assignments. Receipt scanning was tested with various receipt formats including printed receipts, handwritten notes, and digital invoices. The bulk import feature was verified to correctly parse multi-line text input and display accurate XP calculations before submission. 

The chatbot was tested for intent routing accuracy, ensuring simple queries receive local responses while complex financial questions are forwarded to Grok. Streaming responses were verified to display character-by-character with the blinking cursor effect. SmartWidget rendering was tested for all four widget types covering spending summary, itinerary, goal progress, and daily transactions. 

Budget calculations were verified against manual computations to ensure the 50/30/20 allocation and waterfall overflow cascade produce accurate results. The gamification system was tested to confirm XP rewards and penalties are applied correctly and level progression updates the bear avatar appropriately. 

93 

## **4.5.2  AI Model Performance Evaluation** 

This section presents quantitative evaluation of the AI classification models using metrics generated during training and testing phases. 

### **a) Transaction Classification Accuracy** 

The Bi-LSTM transaction classification model was evaluated on a held-out test set of 50,086 samples representing 22.7% of the total dataset. The model achieved 99.61% overall accuracy with balanced performance across both primary categories. 

The Needs category achieved 99.70% precision and 99.59% recall, while the Wants category achieved 99.51% precision and 99.64% recall. The weighted F1-Score across both categories was 0.9961, indicating robust classification performance with minimal bias toward either class. Table 4.2 summarizes the classification metrics for both categories. 

**Table 4.2** Transaction Classification Metrics 

|**Category**|**Precision**|**Recall**|**F1-Score**|**Support**|
|---|---|---|---|---|
|**Needs**|99.70%|99.59%|0.9964|27,254|
|**Wants**|99.51%|99.64%|0.9957|22,832|
|**Weighted Avg**|99.61%|99.61%|0.9961|50,086|



The training process converged smoothly over 100 epochs with early stopping triggered by the patience threshold. Figure 4.22 presents the training accuracy curve showing the model's learning progression across epochs. 

94 



<!-- Start of picture text -->
Model Accuracy Performance<br>ooo?<br>0.99 7,4<br>Y<br>0.98<br>><br>ie}<br>gs<br>|<br>cs}<br>< 0.97<br>0.96<br>—— Train Accuracy<br>—-=: Validation Accuracy<br>0.95<br>0.0 2.5 5.0 75 10.0 12.5 15.0 17.5<br>Epoch<br><!-- End of picture text -->



<!-- Start of picture text -->
Confusion Matrix: Needs vs Wants<br>25000<br>3<br>8 a3 20000<br>Cc<br>=<oO 15000<br>2<br>g<br>— 10000<br>2<br>g 82<br>- 5000<br>needs wants<br>Predicted<br><!-- End of picture text -->



<!-- Start of picture text -->
Confusion Matrix: Subcategories<br>17500<br>Entertainment 5584 2 2 7 25 10 0<br>15000<br>Financial Services 0 3780 2 19 19 14 7<br>12500<br>Food & Beverage 0 20 18350 100 26 0 3<br>10000<br>o<br>Fe Others 1 5 17 5633 57 1 4<br><<br>7500<br>Shopping 5 1 2 25 11866 0 0<br>— 5000<br>Telecommunication 6 14 0 2 1 218 0<br>— 2500<br>Transportation 0 ls] 16 46 5 17 4139<br>-0<br>Cy+ te2 SS)2 &S 2Ss SSS SSS<br>eS s & s ss & s<br>Na 2 cod Ss > &<br>& Ro cn & FS<br>¢ $ 2 xe<br>& « xo<br>Predicted<br><!-- End of picture text -->



<!-- Start of picture text -->
Prediction Confidence Distribution<br>50000 ~ true_category<br>|= wants<br>mmm needs<br>40000 t t<br>30000 T T t t<br>é<br>20000<br>10000 T T t ] +<br>0<br>0.5 0.6 0.7 0.8 0.9 1.0<br>Confidence Score (0-1)<br><!-- End of picture text -->





<!-- Start of picture text -->
Intent Classification Model Training Progress<br>Loss Curve Accuracy Curve<br>——— ValidationTraining 100<br>0.7<br>0.6 80<br>0.5<br>g 60<br>204 icy<br>0.3 40<br>0.2<br>20<br>0.1<br>—— Training<br>0.0 — Validation<br>0<br>0 5 10 15 20 25 0 5 10 15 20 25<br>Epoch Epoch<br><!-- End of picture text -->



<!-- Start of picture text -->
Intent Classification F1 Scores (Top 20)<br>BANG LINK NG i | | — +00<br>DEF_COMPOUND_ INTEREST — +00<br>DEF_DEBT_AVALANCHESS — 00<br>DEF_DEBT_SNOWBALL 4.00<br>DEF_ INFLATION +00<br>DEF_TABUNG_HAJ! iS 00<br>HELP_AL CATEGORIZATIONI — +00<br>= HELP_REBALANCING _SS — +00<br>2 JOKE 1.00<br>COMPLAINT +00<br>Fe___.___<br>HELP_GAMIFICATION_XPST 4.00<br>HELP_RESET_OATA +00<br>THANG VOU+00<br>DEF_CREDIT_SCORE 4.00<br>WHY_BERUANG [iT +00<br>HELP_KNOWLEDGE_SASEi| } I ——— GoodFair (0.6) (0.8)<br>1 1<br>0.0 0.2 0.4 0.6 0.8 1.0<br>F1 Score<br><!-- End of picture text -->



<!-- Start of picture text -->
Confusion Matrix (Top 15 Intents)<br>COMPLEX_ADVICE fRMKhIO) 0 1 0 0 1 1 0 0 0 0 0 1 0 0<br>GREETING 0 938 0 0 1 0 0 0 0 0 0 0 0 0 0<br>GARBAGE 6 8 745 2 0 0 0 0 0 1 0 0 0 1 0 10000<br>BYE 0 0 0 536 0 0 0 0 0 0 1 0 0 0 0<br>THANK_YOU 0 0 1 (0) 355 0 0 0 0 0 0 (0) 0 0 0<br>8000<br>HELP_SAVINGS_SCREEN 1 0 0 (0) 0 338 0 0 0 0 0 0 0 0 0<br>t¢_ HELP_ADD_TRANSACTION 1 0 0 (0) ie} 0 272 0 0 0 0 0 0 0 0<br>Oo ~<br>& ADVICE_MOTIVATION = 4 0 0 0 0 0 0 236 0 0 ) 0 0 0 0 6000 5<br>-oO> COMPLAINT 0 0 0 0 0 0 0 0 221 0 0 0 0 0 0 [)<br>DEVELOPER_INFO 0 0 0 0 0 0 0 0 0 215 0 0 0 0 0<br>— 4000<br>HELP_INITIAL_BALANCE 1 0 0 0 0 0 0 0 0 0 198 0 0 0 0<br>BANK_LINKING 0 0 0 0 0 0 0 0 0 0 0 195 0 0 0<br>HELP_INCOME_ALLOCATION 0 0 0 0 (0) 0 0 0 0 0 0 0 189 0 0 — 2000<br>TESTING 0 0 0 0 0 0 0 0 0 0 0 0 0 189 0<br>HELP_GAMIFICATION_XP 0 0 0 (0) 0 0 1 0 0 0 0 0 0 0 186<br>-0<br>RS& cS© 3& é& soNy &> &~ e~ es& RSfe) RS& Sso oO= Ss© a>g<br>SY & § ef SF SS SS © F SF SF ¥<br>&Kz ° SeRS «&SF &PF weKr& ¥ x7 w&<br>reo) ¥ SS’ RY SF cS » oS<br>3’ ey © oe’ RS oe’<br>< & x S 7 x<br>Predicted Intent<br><!-- End of picture text -->

with category words. This produced consistent output formatting across varied receipt content. 

### **d) RAG Response Effectiveness** 

The Retrieval‑Augmented Generation system was evaluated qualitatively through conversational testing across multiple query categories, focusing on personalization depth, Malaysian context relevance and advice actionability. Personalization testing confirmed that the chatbot accurately references actual user data, citing transaction totals and category breakdowns from the injected RAG context and communicating precise budget overflow warnings when the Waterfall Cascade detected overspending. Malaysian context relevance was verified through queries about local financial products and services, with the chatbot successfully referencing ASB, EPF and Tabung Haji by drawing from the 388 expert tips and correctly injecting state‑specific DOSM data for cost‑of‑living comparisons. 

The Supercharged Advice Pillars were evaluated for consistent application. Responses demonstrated Survival Units by framing amounts in terms of meals or daily expenses, Opportunity Cost by comparing purchase alternatives and Time Sensitivity by emphasizing immediate actionable steps. Behavioural Nudging was evident through gentle, non‑judgmental warnings about overspending. 

## **4.5.3  User Acceptance Testing (UAT)** 

User Acceptance Testing was designed to gather subjective feedback from target users within the 18-30 age demographic, directly addressing the third objective regarding the usability of the developed financial guidance application. A structured questionnaire was developed using the System Usability Scale methodology combined with feature-specific evaluation 

101 



<!-- Start of picture text -->
Which age group do you belong to?<br>55 responses<br>@ 18-24<br>@ 25-30<br>a @ 31+<br>Sa~<br>89.1%<br><!-- End of picture text -->



<!-- Start of picture text -->
| would like to use this app regularly.<br>55 responses<br>40<br>30<br>20<br>10<br>0 (0%) 0 (0%) 288%)<br>ty)<br>1 2 3 4 5<br><!-- End of picture text -->



<!-- Start of picture text -->
The app was easy to use.<br>55 responses<br>40<br>30<br>20<br>10<br>0 (0%) 0 (0%) 1 (1.8%)<br>0<br>1 2 3 4 5<br><!-- End of picture text -->



<!-- Start of picture text -->
The Receipt Scanning correctly identified details from my image.<br>55 responses<br>40<br>30<br>20<br>10<br>0 (0%) 0 (0%) 2 (3.6%)<br>0<br>1 2 3 4 5<br><!-- End of picture text -->



<!-- Start of picture text -->
The XP rewards and bear evolution made managing money more enjoyable.<br>55 responses<br>60<br>40<br>20<br>0 (0%) 0 (0%) 1 (1.8%)<br>i)<br>1 2 3 4 5<br><!-- End of picture text -->



<!-- Start of picture text -->
The app correctly categorized my transactions as Needs, Wants, or Savings.<br>55 responses<br>40<br>30<br>20<br>10<br>0 (0%) 0 (0%) 1 (1.8%)<br>0<br>1 2 3 4 5<br><!-- End of picture text -->



<!-- Start of picture text -->
The chatbot's advice was personalized to MY financial situation and goals.<br>55 responses<br>40<br>30<br>20<br>10<br>0 (0%) 1 (1.8%) 23.6%)<br>0<br>1 2 3 4 5<br><!-- End of picture text -->



<!-- Start of picture text -->
The chatbot provided Malaysian-specific advice (e.g., ASB, EPF, local context).<br>55 responses<br>60<br>40<br>20<br>0 (0%) 0 (0%) 1 (1.8%)<br>0<br>1 2 3 4 5<br><!-- End of picture text -->



<!-- Start of picture text -->
| trust the financial advice provided by Beruang.<br>55 responses<br>40<br>30<br>20<br>10<br>0 (0%) 0 (0%) 1 (1.8%)<br>0<br>1 2 3 4 5<br><!-- End of picture text -->



<!-- Start of picture text -->
Using Beruang makes me feel more confident in managing my personal finances.<br>55 responses<br>60<br>40<br>20<br>0 (0%) 0 (0%) 1 (1.8%)<br>0<br>1 2 3 4 5<br><!-- End of picture text -->

Play Store, indicating a strong user desire to integrate the application into their long-term digital ecosystem. 

## **4.6 Conclusion** 

This chapter successfully demonstrated the complete engineering and validation of the Beruang application by transforming the initial architectural blueprints into a fully functional production-grade system. The development phase established a robust hybrid multi-model AI brain that integrates a local Bi-LSTM transaction classifier achieving 99.61% accuracy and a MiniLM intent router achieving 99.62% accuracy alongside cloud-based intelligence from Google Gemini 2.5 Flash for receipt OCR and xAI Grok 4.1 Fast for RAG-powered financial advice. These intelligent services were seamlessly delivered through a high-performance React Native frontend featuring realtime synchronization and interactive gamification elements that engaged users across 13 distinct interface screens. Comprehensive evaluation proved the system's technical reliability with F1-Scores exceeding 0.99 while User Acceptance Testing confirmed its market readiness through a System Usability Scale score of 86.77 and a verifiable increase in financial management confidence for 98.2% of the target audience. Ultimately, this project fulfills its core objectives by delivering a technically sophisticated yet highly accessible financial instrument that effectively bridges the gap between complex economic planning and the daily habits of young adults aged 18-30. 

108 

## **CHAPTER 5** 

## **CONCLUSION AND RECOMMENDATION** 

## **5.1 Introduction** 

This chapter concludes the research project by summarizing the development and evaluation of Beruang which is a money management mobile application integrated with a personal financing chatbot. It provides a comprehensive review of how the project successfully addressed its initial problem statement regarding the lack of accessible financial guidance for young adults. The chapter revisits the three core project objectives and maps the technical achievements documented in the previous chapter directly to these goals. Furthermore, it synthesizes the key findings and contributions of the study by highlighting both the technical reliability of the hybrid AI architecture and the social impact on user financial confidence. Finally, the chapter critically analyzes the limitations encountered during the development process and proposes strategic recommendations for future enhancements to ensure the application remains relevant and scalable in the evolving fintech landscape. 

## **5.2 Summary of Project** 

Beruang was developed as a comprehensive financial management solution specifically targeted at young adults aged 18 to 30 as this demographic is often underserved by expensive professional financial advisory services. The project bridges the gap between basic expense tracking and intelligent financial literacy by integrating advanced Machine Learning and Natural Language Processing technologies into a unified mobile ecosystem supported by a scalable Express.js backend. The primary aim was to foster better financial habits through a tool that is both technologically sophisticated and user-centric. 

109 

The application distinguishes itself from traditional budgeting tools through a Hybrid Multi-Model AI Architecture. Unlike standard trackers that rely solely on manual input, Beruang utilizes a local Bidirectional LSTM model executed via TensorFlow.js for instant transaction categorization, a MiniLM transformer for intent classification, and Google Gemini 2.5 Flash for automated receipt scanning. To promote long-term engagement, the system features a gamified Bear Evolution system where users earn Experience Points for positive financial behaviours. Central to the application is the AI Financial Advisor which is powered by xAI Grok 4.1 Fast and a Retrieval-Augmented Generation pipeline. This system delivers hyper-personalized and context-aware financial advice structured around the Supercharged Advice Pillars framework, grounded in the real-time spending data of the user and the Malaysian economic context. 

## **5.3 Revisit of Project Objectives** 

This section systematically evaluates the overall success of the project by critically examining the extent to which the three specific research objectives were effectively realized and achieved through the developed system components. 

## **5.3.1  First Objective** 

The first objective was to identify and implement the most effective Machine Learning and Natural Language Processing techniques for delivering personalized financial recommendations. The identification of these techniques was achieved through a systematic comparative analysis of deep learning architectures conducted during the Model Selection phase of the Machine Learning Life Cycle. This objective was successfully achieved through the design and validation of the Hybrid Multi-Model AI Architecture 

110 

which strategically distributed workloads between on-device and cloud processing to optimize performance and cost. 

A custom Bidirectional LSTM model was identified as the optimal solution for classifying short and informal transaction descriptions. The implementation of this model was trained on a synthetic dataset of 220,152 Malaysian financial records and achieved a testing accuracy of 99.61 percent. This validated the choice of LSTM networks for handling sequential text data in financial contexts. Furthermore, a local MiniLM sentence transformer was selected to route user queries efficiently. This model achieved a 99.62 percent accuracy in distinguishing between simple app navigation requests and complex financial queries which proved its suitability for privacy-preserving and low-latency intent detection. Finally, the integration of xAI Grok 4.1 Fast within a Retrieval-Augmented Generation pipeline proved highly effective. By injecting real-time user budget states and a Waterfall Budget Cascade analysis into the model context window, the system successfully moved beyond generic advice to provide mathematically grounded and personalized guidance. 

## **5.3.2  Second Objective** 

The second objective focused on the engineering and development of the functional software artifact. This was achieved through the successful deployment of the Beruang mobile application which was built using React Native for cross-platform compatibility and Node.js for the backend infrastructure. The development phase delivered a robust 13-screen interface that seamlessly integrates core financial tools with AI capabilities. 

Key developmental milestones included the implementation of the Smart Receipt Scanning feature using Google Gemini 2.5 Flash which allows users to extract structured spending data from physical receipts with high precision. The developer also successfully coded the Gamification Engine to reinforce the 50/30/20 budgeting rule by awarding Experience Points for savings and 

111 

applying penalties for category overflows. Additionally, the creation of a responsive Chatbot Interface supports real-time streaming responses and renders dynamic Smart Widgets such as charts and itineraries directly within the conversation flow. 

## **5.3.3 Third Objective** 

The third objective was to validate the usability and acceptance of the system among its target audience. To ensure the system was robust before user exposure, the developer first conducted a comprehensive Functional System Testing phase. This process verified the correct operation of all core features including the authentication flows, the accuracy of the Bi-LSTM transaction classification, and the precision of the Gemini-powered receipt scanning. Furthermore, the testing confirmed the reliability of the chatbot’s intent routing and real-time streaming capabilities to ensure seamless interaction. 

Following this technical verification, the objective was achieved through a comprehensive User Acceptance Testing phase involving 55 respondents who primarily fell within the 18 to 30 age group at 98.2 percent. The evaluation process utilized standard psychometric tools to ensure the reliability of the feedback gathered. 

The application achieved a System Usability Scale score of 86.77 which classifies the user experience as Excellent. This quantitative metric confirms that the flat navigation architecture and automated features significantly reduced the cognitive load associated with financial tracking. Crucially, the evaluation confirmed the social impact of the project with 98.2 percent of respondents agreeing that using Beruang made them feel more confident in managing their personal finances. Specific features received high satisfaction ratings such as the Gamification elements which received a mean score of 4.78 out of 5 and the Receipt Scanning accuracy which received a mean score of 

112 

4.64 out of 5. These scores validate the design choices made during development. 

## **5.4 Summary of Findings and Contributions** 

The research and development of the Beruang application have yielded significant findings regarding the application of AI in personal finance. Technologically, the study demonstrates that a hybrid AI approach which combines lightweight local models like Bi-LSTM and MiniLM with powerful cloud LLMs like Grok and Gemini is a viable strategy for mobile development. This architecture allows for 99.61 percent accuracy in transaction categorization without incurring the high latency or costs associated with sending every interaction to the cloud. 

From a user experience perspective, the findings contribute to the understanding of digital financial behaviour. The high engagement with the gamification features suggests that bear evolution avatars and Experience Point rewards are effective motivators for the demographic aged 18 to 30 years old, as they transform tedious bookkeeping into an engaging loop. Furthermore, the strong user trust rating of 4.65 out of 5 for the advice provided by the chatbot validates the Retrieval-Augmented Generation implementation. It proves that users are willing to trust AI financial guidance provided it is transparently grounded in their own data such as specific budget overflows and localized to their economic reality by referencing Malaysian financial tools such as ASB or Tabung Haji. 

## **5.5 Limitations of the Study** 

Despite the success of the project, several limitations were identified during the development and evaluation phases. The first limitation is the dependency on internet connectivity. The core intelligence features of the application such 

113 

as the Gemini Vision receipt scanner and the Grok AI chatbot rely strictly on active internet connections. While the local Bi-LSTM model allows for offline manual entry, users cannot access the personal financial advisor or OCR features in offline environments which limits accessibility in areas with poor connectivity. 

The second limitation involves the friction associated with manual data entry. Although receipt scanning and bulk import features were implemented to reduce friction, the application still requires user initiation for all data entry. Unlike banking apps that automatically sync transactions, Beruang relies on the discipline of the user to capture receipts or input data. This human-in-theloop requirement may lead to data gaps if the user forgets to log expenses for a few days. The third limitation is the lack of voice interaction. The current chatbot interface is text-only. While it supports real-time streaming, it does not support voice-to-text input or text-to-speech output. This limits accessibility for users who prefer auditory interaction or those who wish to log finances hands-free while on the go. 

## **5.6 Recommendations** 

Based on the feedback collected from the User Acceptance Testing and the technical limitations identified above, the following recommendations are proposed for future iterations of the project. 

## **5.6.1  Interface Enhancements** 

User feedback indicated a strong desire for greater visual customization. To improve accessibility and user retention, future development should prioritize the implementation of a Dark Mode. This feature is standard in modern mobile ecosystems and would reduce eye strain during evening usage which is a common time for users to review their daily finances. Additionally, enabling 

114 

customizable font sizes would further enhance accessibility for users with visual impairments to ensure the financial advice remains readable for all segments of the target demographic. 

## **5.6.2  Automated Data Integration** 

To address the limitation of manual data entry friction, future work should prioritize strategic collaborations with financial institutions while strictly adhering to privacy-first principles. As outlined in the Exposure Draft on Open Finance Framework (Bank Negara Malaysia, 2025), while the regulatory framework for a consent-driven data ecosystem is emerging, immediate technical standards are still evolving. Consequently, the project recommends a proactive approach by establishing collaborative pilots with established banks such as Maybank through the MConnect Sandbox or pursuing direct corporate API partnerships with institutions like CIMB. A critical and actionable step is to formally apply for participation in the Bank Negara Malaysia (BNM) Regulatory Sandbox, which offers a controlled environment to test automated transaction ingestion compliant with national financial standards. Furthermore, to address privacy concerns inherent in sharing financial data, the application should integrate Federated Learning or enhance its on-device processing capabilities. These technologies would serve as secure alternatives to full data sharing, enabling the system to analyze spending patterns and train models locally on the user's device, thereby ensuring that sensitive transaction details remain private while still benefiting from automated insights. 

## **5.6.3  Ecosystem Expansion** 

The final recommendation addresses the deployment and reach of the application. Participants in the survey explicitly requested availability on public app stores to facilitate easier installation and updates. Therefore, the next logical step is to prepare the application for production deployment on the 

115 

Google Play Store and Apple App Store. This involves optimizing the React Native codebase for production builds, implementing rigorous security compliance checks required by these platforms, and establishing a continuous update pipeline. Expanding the ecosystem to include a companion smartwatch widget for quick balance checking could also be explored to further integrate Beruang into the daily digital lifestyle of the user. 

## **5.7 Conclusion** 

In conclusion, this project successfully demonstrated the complete engineering and validation of Beruang by transforming a conceptual framework for financial literacy into a fully functional and production-grade intelligent system. By effectively harmonizing local machine learning models with advanced cloud-based generative AI, the application delivers a financial management experience that is both technically sophisticated and deeply personalized. The ability of the system to achieve near-perfect classification accuracy at 99.61 percent and high user satisfaction scores with a SUS of 86.77 serves as a testament to the viability of AI as a tool for financial empowerment. More importantly, the verifiable increase in financial confidence among 98.2 percent of the target audience confirms that technology can effectively bridge the gap between complex economic planning and the daily habits of young Malaysian adults when designed with empathy and local context. As financial landscapes become increasingly complex, tools like Beruang will play a pivotal role in equipping the next generation with the clarity, discipline, and insight needed to achieve long-term financial well-being. 

116 

## **REFERENCES** 

Agrawal, Y., Anand, V., Gupta, M., Arunachalam, S., & Varma, V. (2021). Goal-Directed Extractive Summarization of Financial Reports. _Proceedings of the 30th ACM International Conference on Information & Knowledge Management_ , 2817–2821. https://doi.org/10.1145/3459637.3482113 

Ahmad, K., & Mohamed Zabri, S. (2023). The Links Between Demographic Factors and Financial Literacy Among Youths. _Malaysian Journal of Social Sciences and Humanities (MJSSH)_ , _8_ (11), e002593. https://doi.org/10.47405/mjssh.v8i11.2593 

- Alenazi, M., & Sas, C. (2023). _Evaluating Budgeting Apps: Limited Support for Budgeting Compared to Tracking_ . https://doi.org/10.14236/ewic/BCSHCI2023.1 

- Alzubaidi, L., Zhang, J., Humaidi, A. J., Al-Dujaili, A., Duan, Y., Al-Shamma, O., Santamaría, J., Fadhel, M. A., Al-Amidie, M., & Farhan, L. (2021). Review of deep learning: concepts, CNN architectures, challenges, applications, future directions. _Journal of Big Data_ , _8_ (1), 53. https://doi.org/10.1186/s40537-021-00444-8 

- An, Q., Rahman, S., Zhou, J., & Kang, J. J. (2023). A Comprehensive Review on Machine Learning in Healthcare Industry: Classification, Restrictions, Opportunities and Challenges. _Sensors_ , _23_ (9), 4178. https://doi.org/10.3390/s23094178 

- Anand, S., & Prakasam, P. (2024). Deep Learning-based Text News Classification using Bidirectional LSTM Model. _2024 3rd International Conference on Artificial Intelligence For Internet of Things (AIIoT)_ , 1–6. 

https://doi.org/10.1109/AIIoT58432.2024.10574679 

- Anipa, C. A. A., Karikari, F. A., Boateng, S. A., Fumey, M. P., Essuman, A. N., Baidoo, M. I., Assan, P. D., & Kusi, L. Y. (2025). Access to Finance, Financial Management, and Growth of Non-Traditional Export Firms in Ghana: Does Sector Difference Count? _Scientific African_ , e02706. https://doi.org/10.1016/J.SCIAF.2025.E02706 

Bank Negara Malaysia. (2025). _Exposure Draft: Policy Document on Open Finance_ . 

Bank Negara Malaysia. (2023). _Economic & Monetary Review 2023_ . https://www.bnm.gov.my/documents/20124/12141961/emr2023_en_book.pdf 

- Bhamare, T. D., Agarkar, T., & Bharadwaj, S. (2025). _Personal Finance Management Integrating Chatbot_ . _27_ (1), 46–52. https://doi.org/10.9790/0661-2701034652 

- Biju, A. K. V. N., Thomas, A. S., & Thasneem, J. (2024). Examining the research taxonomy of artificial intelligence, deep learning &amp; machine learning in the financial sphere—a bibliometric analysis. _Quality & Quantity_ , _58_ (1), 849–878. https://doi.org/10.1007/s11135-023-01673-0 

Bitrián, P., Buil, I., & Catalán, S. (2021). Making finance fun: the gamification of personal financial management apps. _International Journal of Bank Marketing_ , _39_ (7), 1310– 1332. https://doi.org/10.1108/IJBM-02-2021-0074 

- Braithwaite, D. T., Cavalcanti, M., McEver, R. A., Udagawa, H., Silva, D., Ramanath, R., Meneses, F., Yoshida, A., Wingert, E., Ramos, M., Zanfelice, B., & Gupta, A. (2025). 

117 

_Your Spending Needs Attention: Modeling Financial Habits with Transformers_ . http://arxiv.org/abs/2507.23267 

- Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A., Agarwal, S., Herbert-Voss, A., Krueger, G., Henighan, T., Child, R., Ramesh, A., Ziegler, D. M., Wu, J., Winter, C., … Amodei, D. (2020). _Language Models are Few-Shot Learners_ . 

- Carlin, B., Olafsson, A., & Pagel, M. (2023). Mobile Apps and Financial Decision Making. _Review of Finance_ , _27_ (3), 977–996. https://doi.org/10.1093/rof/rfac040 

- Chandrasekaran, J., Cody, T., McCarthy, N., Lanus, E., & Freeman, L. (2023). _Test & Evaluation Best Practices for Machine Learning-Enabled Systems_ . 

- de Bruin, B., Cherednychenko, O., Hermes, N., Kramer, M., & Meyer, M. (2024). Demand for financial advice: Evidence from a randomized choice experiment. _Journal of Banking & Finance_ , _163_ , 107193. https://doi.org/10.1016/J.JBANKFIN.2024.107193 

- Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). _BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding_ . 

- Dowling, M., & Lucey, B. (2023). ChatGPT for (Finance) research: The Bananarama Conjecture. _Finance Research Letters_ , _53_ , 103662. https://doi.org/10.1016/J.FRL.2023.103662 

- Du, K., Zhao, Y., Mao, R., Xing, F., & Cambria, E. (2025). Natural language processing in finance: A survey. _Information Fusion_ , _115_ , 102755. https://doi.org/10.1016/J.INFFUS.2024.102755 

- Gallardo-Vázquez, D., Miralles-Quirós, J. L., & Miralles-Quirós, M. M. (2024). Financial education and responsible consumption in undergraduate management students. _The International Journal of Management Education_ , _22_ (3), 101071. https://doi.org/10.1016/J.IJME.2024.101071 

- Gao, H., Kou, G., Liang, H., Zhang, H., Chao, X., Li, C.-C., & Dong, Y. (2024). Machine learning in business and finance: a literature review and research opportunities. _Financial Innovation_ , _10_ (1), 86. https://doi.org/10.1186/s40854-024-00629-z 

- Garcia, M. B., & Claour, J. P. (2021). Mobile Bookkeeper: Personal Financial Management Application with Receipt Scanner Using Optical Character Recognition. _2021 1st Conference on Online Teaching for Mobile Education (OT4ME)_ , 15–20. https://doi.org/10.1109/OT4ME53559.2021.9638794 

- Gerling, C., & Lessmann, S. (2025). Multimodal Document Analytics for Banking Process Automation. _Information Fusion_ , _118_ , 102973. https://doi.org/10.1016/j.inffus.2025.102973 

- Graham, G., Nisar, T. M., Prabhakar, G., Meriton, R., & Malik, S. (2025). Chatbots in customer service within banking and finance: Do chatbots herald the start of an AI revolution in the corporate world? _Computers in Human Behavior_ , _165_ , 108570. https://doi.org/10.1016/j.chb.2025.108570 

- Guo, J., Wang, S., Ni, L. M., & Shum, H.-Y. (2024). Quant 4.0: engineering quantitative investment with automated, explainable, and knowledge-driven artificial intelligence. 

118 

_Frontiers of Information Technology & Electronic Engineering_ , _25_ (11), 1421–1445. https://doi.org/10.1631/FITEE.2300720 

Hean, O., Saha, U., & Saha, B. (2025). Can AI help with your personal finances? _Applied Economics_ , 1–9. https://doi.org/10.1080/00036846.2025.2450384 

Hii, I. S. H., Ho, P. L., Yap, C. S., & Philip, A. P. (2022). Financial Literacy, Financial Advice, and Stock Market Participation: Evidence From Malaysia. _Journal of Financial Counseling and Planning_ , _33_ (2), 243–254. https://doi.org/10.1891/JFCP2021-0011 

Imanuel, J., Kintanswari, L., Vincent, Anggreainy, M. S., Yusuf, S., & Sembiring Kembaren, S. Y. (2022). Development of Financial Planner Application Software Based on Waterfall Model. _9th International Conference on ICT for Smart Society: Recover Together, Recover Stronger and Smarter Smartization, Governance and Collaboration, ICISS 2022 - Proceeding_ . https://doi.org/10.1109/ICISS55894.2022.9915039 

Imawan, R., Putra, W. P., Alqahtani, R., Milakis, E. D., & Dumchykov, M. (2025). Enhancing Financial Literacy in Young Adults: An Android-Based Personal Finance Management Tool. _Journal of Hypermedia & Technology-Enhanced Learning_ , _3_ (1), 64–89. https://doi.org/10.58536/j-hytel.166 

Jain, N., Mishra, D., Sahani, A., & Prajapati, H. (2025). EXPENSE TRACKER. In _International Journal of Engineering Applied Science and Management ISSN_ (Vol. 6, Number 1). https://www.researchgate.net/publication/388499664 

Janiesch, C., Zschech, P., & Heinrich, K. (2021). Machine learning and deep learning. _Electronic Markets_ , _31_ (3), 685–695. https://doi.org/10.1007/s12525-021-00475-2 

Kamarudeen, M., & Vijayalakshmi, K. (2023). _Machine Learning based Financial Management Mobile Application to enhance College Students’ Financial Literacy_ . www.istes.org 

Khairi, S. M. M., Salleh, S. M., Abdul Halim, N., Mahmood, M., & Mat Yusoff, M. Y. (2024). Usage of Digital Finance Applications and its Impact on Financial Well-Being: A Conceptual Framework. _International Journal of Research and Innovation in Social Science_ , _VIII_ (IX), 3380–3390. https://doi.org/10.47772/IJRISS.2024.8090284 

Khanna, U., Ghodratnama, S., Mollá, D., & Beheshti, A. (2022). _Transformer-based Models for Long Document Summarisation in Financial Domain_ (Vol. 24). http://wp.lancs.ac.uk/cfie/fns2022/ 

Khurana, D., Koli, A., Khatter, K., & Singh, S. (2023). Natural language processing: state of the art, current trends and challenges. _Multimedia Tools and Applications_ , _82_ (3), 3713– 3744. https://doi.org/10.1007/s11042-022-13428-4 

Kobets, V. M., & Kozlovskyi, K. H. (2022). Application of chat bots for personalized financial advice. _Herald of Advanced Information Technology_ , _5_ (3), 229–242. https://doi.org/10.15276/hait.05.2022.18 

- KWSP. (2025, April 25). _50/30/20 Budget Rule: A Beginner’s Guide_ . KWSP Malaysia. https://www.kwsp.gov.my/en/w/article/50-30-20-rule 

119 

- Li, C., Xie, Z., & Wang, H. (2025). Short Text Classification Based on Enhanced Word Embedding and Hybrid Neural Networks. _Applied Sciences_ , _15_ (9), 5102. https://doi.org/10.3390/app15095102 

- Li, C. Y., Fang, Y. H., & Chiang, Y. H. (2023). Can AI chatbots help retain customers? An integrative perspective using affordance theory and service-domain logic. _Technological Forecasting and Social Change_ , _197_ , 122921. https://doi.org/10.1016/J.TECHFORE.2023.122921 

- Li, Y.-C., Huang, H.-Y., Yang, N.-P., & Kung, Y.-H. (2023). Stock Market Forecasting Based on Spatiotemporal Deep Learning. _Entropy_ , _25_ (9), 1326. https://doi.org/10.3390/e25091326 

- Liu, B., & Lu, B. (2023). Can financial literacy be a substitute for financial advisers? Evidence from China. _Pacific-Basin Finance Journal_ , _79_ , 102046. https://doi.org/10.1016/J.PACFIN.2023.102046 

- Mohd Shamsuddin, A., Samson Juan, S., Chua, S., & Bramantoro, A. (2024). SemiAutomatic Sentiment Identification for Malay-English Code-Switched Data. _Journal of Advanced Research Design_ , _123_ (1), 198–212. 

https://doi.org/10.37934/ard.123.1.198212 

- Moon, E. (2024, February 5). _Revolutionizing Usability Testing with Machine Learning_ . UXmatters. https://www.uxmatters.com/mt/archives/2024/02/revolutionizing-usabilitytesting-with-machine-learning.php 

- Mou, S., Xue, Q., Chen, X., Chen, J., Takashima, R., Takiguchi, T., & Ariki, Y. (2025). Prefix tuning with prompt augmentation for efficient financial news summarization. _Journal of Computational Social Science_ , _8_ (1), 19. https://doi.org/10.1007/s42001-02400352-w 

- Mussa, A., Tuimebayev, Z., & Mansurova, M. (2025). Make Large Language Models Efficient: A Review. _IEEE Access_ , _13_ , 154466–154490. https://doi.org/10.1109/ACCESS.2025.3605110 

- Narangarav Batbaatar. (2025). Generative AI for financial document summarization and risk analysis. _World Journal of Advanced Research and Reviews_ , _26_ (3), 1925–1937. https://doi.org/10.30574/wjarr.2025.26.3.2382 

- Nasir, A., Javed, U., Hagan, K., Chang, R., Kundi, H., Amin, Z., Butt, S., Al-Kindi, S., & Javed, Z. (2025). Social determinants of financial stress and association with psychological distress among young adults 18–26 years in the United States. _Frontiers in Public Health_ , _12_ . https://doi.org/10.3389/fpubh.2024.1485513 

- Nguyen, L., & Lee, J. (2021). Manual Budgeting and Forecasting and Its Disadvantages. _International Journal on Economics, Finance and Sustainable Development_ , _3_ (1). 

- Núñez‐Letamendia, L., Sánchez‐Ruiz, P., & Silva, A. C. (2025). More Than Knowledge: Consumer Financial Capability and Saving Behavior. _International Journal of Consumer Studies_ , _49_ (1). https://doi.org/10.1111/ijcs.13097 

- Obaido, G., Mienye, I. D., Egbelowo, O. F., Emmanuel, I. D., Ogunleye, A., Ogbuokiri, B., Mienye, P., & Aruleba, K. (2024). Supervised machine learning in drug discovery and 

120 

development: Algorithms, applications, challenges, and prospects. _Machine Learning with Applications_ , _17_ , 100576. https://doi.org/10.1016/J.MLWA.2024.100576 

- Organisation for Economic Co-operation and Development. (2024). _OECD Economic Surveys: Malaysia 2024_ . https://www.oecd.org/en/publications/oecd-economicsurveys-malaysia-2024_e45ca31a-en.html 

Patwardhan, N., Marrone, S., & Sansone, C. (2023). Transformers in the Real World: A Survey on NLP Applications. In _Information (Switzerland)_ (Vol. 14, Number 4). MDPI. https://doi.org/10.3390/info14040242 

Peralta, R. R., Licayan, J. B. G., Oandasan, M. N. C., Santos, G. D. S., Tan, R. P., & Tarayao, G. T. (2024). _Budgeting Strategies of Financial Management Students: A Basis for Investment Decision_ . _19_ (05), 506–520. 

PIDM. (2022). _Why don’t we save more: Encouraging Malaysian Financial Resilience_ . https://www.pidm.gov.my/pidm2022/media/assets/pdf/PIDM-BIT-SavingsReport_website-final.pdf 

- Pimparkhede, S., & Bhattacharyya, P. (2025). _Main Predicate and Their Arguments as Explanation Signals For Intent Classification_ . http://arxiv.org/abs/2502.01270 

Polireddi, N. S. A. (2024). An effective role of artificial intelligence and machine learning in banking sector. _Measurement: Sensors_ , _33_ , 101135. https://doi.org/10.1016/J.MEASEN.2024.101135 

- Pooja Bhatt, A., Kiran Kondapally, U., & Lokineni, H. (2024). Expense Tracker: A Smart Approach to Track Daily Expense. In _Tuijin Jishu/Journal of Propulsion Technology_ (Vol. 45, Number 1). 

Rahman, M., Isa, C. R., Masud, M. M., Sarker, M., & Chowdhury, N. T. (2021). The role of financial behaviour, financial literacy, and financial stress in explaining the financial well-being of B40 group in Malaysia. _Future Business Journal_ , _7_ (1), 52. https://doi.org/10.1186/s43093-021-00099-0 

- Rahman, M. S., Khomh, F., Hamidi, A., Cheng, J., Antoniol, G., & Washizaki, H. (2021). _Machine Learning Application Development: Practitioners’ Insights_ . 

- Ren, R., Zapata, M., Castro, J. W., Dieste, O., & Acuna, S. T. (2022). Experimentation for Chatbot Usability Evaluation: A Secondary Study. _IEEE Access_ , _10_ , 12430–12464. https://doi.org/10.1109/ACCESS.2022.3145323 

- Rodríguez-Correa, P. A., Arias García, S., Bermeo-Giraldo, M. C., Valencia-Arias, A., Martínez Rojas, E., Aurora Vigo, E. F., & Gallegos, A. (2025). Financial literacy among young college students: Advancements and future directions . _F1000Research_ , _14_ , 113. https://doi.org/10.12688/f1000research.159085.2 

- Sajid, M., Mushtaq, R., Murtaza, G., Yahiaoui, D., & Pereira, V. (2024). Financial literacy, confidence and well-being: The mediating role of financial behavior. _Journal of Business Research_ , _182_ , 114791. https://doi.org/10.1016/J.JBUSRES.2024.114791 

- Schlegel, M., & Sattler, K.-U. (2023). Management of Machine Learning Lifecycle Artifacts. _ACM SIGMOD Record_ , _51_ (4), 18–35. https://doi.org/10.1145/3582302.3582306 

Securities Commission Malaysia. (2023). _Annual Report 2023 – Highlights_ . 

121 

Shakil, H., Farooq, A., & Kalita, J. (2024). _Abstractive Text Summarization: State of the Art, Challenges, and Improvements_ . https://doi.org/10.1016/j.neucom.2024.128255 

Simonse, O., Van Dijk, W. W., Van Dillen, L. F., & Van Dijk, E. (2024). Economic predictors of the subjective experience of financial stress. _Journal of Behavioral and Experimental Finance_ , _42_ , 100933. https://doi.org/10.1016/J.JBEF.2024.100933 

- Takayanagi, T., Izumi, K., Sanz-Cruzado, J., McCreadie, R., & Ounis, I. (2025). _Are Generative AI Agents Effective Personalized Financial Advisors?_ 

- Team Gemini. (2024). _Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context_ . 

Wahidur, R. S. M., Tashdeed, I., Kaur, M., & Lee, H.-N. (2024). Enhancing Zero-Shot Crypto Sentiment With Fine-Tuned Language Model and Prompt Engineering. _IEEE Access_ , _12_ , 10146–10159. https://doi.org/10.1109/ACCESS.2024.3350638 

Wang, L., Cheng, Y., Xiang, A., Zhang, J., & Yang, H. (2024). _Application of Natural Language Processing in Financial Risk Detection_ . 

- Wang, Z., Jiang, Z., Zhang, X., Soon, J., Zhang, J., Xiaoyao, W., & Du, H. (2023). Beyond Pure Text: Summarizing Financial Reports Based on Both Textual and Tabular Data. _Proceedings of the Thirty-Second International Joint Conference on Artificial Intelligence_ , 5233–5241. https://doi.org/10.24963/ijcai.2023/581 

- xAI. (2025, November 19). _Grok 4.1 Fast and Agent Tools API | xAI_ . https://x.ai/news/grok4-1-fast 

- Yang, H., Liu, X.-Y., & Dan Wang, C. (2023). FinGPT: Open-Source Financial Large Language Models. _SSRN Electronic Journal_ . https://doi.org/10.2139/ssrn.4489826 

Yin, S., Fu, C., Zhao, S., Li, K., Sun, X., Xu, T., & Chen, E. (2024). A survey on multimodal large language models. _National Science Review_ , _11_ (12). https://doi.org/10.1093/nsr/nwae403 

- Yu, J.-M., Ma, H.-J., & Kong, J.-L. (2025). Receipt Recognition Technology Driven by Multimodal Alignment and Lightweight Sequence Modeling. _Electronics_ , _14_ (9), 1717. https://doi.org/10.3390/electronics14091717 

Zhao, P., Zhang, H., Yu, Q., Wang, Z., Geng, Y., Fu, F., Yang, L., Zhang, W., Jiang, J., & Cui, B. (2026). Retrieval-Augmented Generation for AI-Generated Content: A Survey. _Data Science and Engineering_ . https://doi.org/10.1007/s41019-025-00335-5 

- Zhu, H., Vigren, O., & Söderberg, I. L. (2024). Implementing artificial intelligence empowered financial advisory services: A literature review and critical research agenda. _Journal of Business Research_ , _174_ , 114494. https://doi.org/10.1016/J.JBUSRES.2023.114494 

122 

