import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface Speaker {
  slug: string;
  name: string;
  role: string;
  image: string;
  shortBio: string;
  fullBio: string[];
}

export const speakersList: Speaker[] = [
  {
    slug: "tosin-praise-fowowe",
    name: "Tosin Praise-Fowowe",
    role: "Finance Coach & Lead Consultant, TPF Consulting Services",
    image: "/tosin-praise-fowowe.jpg",
    shortBio:
      "Tosin Praise-Fowowe is a renowned finance coach and mentor, specializing in family, individual, and business finance. With over 13 years of experience across both for-profit and non-profit sectors, she empowers individuals and SMEs through financial education, strategy development, and systems optimization as Lead Consultant of TPF Consulting Services.",
    fullBio: [
      "Tosin Praise-Fowowe is a renowned finance coach and mentor, specializing in family, individual, and business finance. With a unique blend of experience across both for-profit and non-profit sectors, her expertise spans strategy development, policy formulation, and financial education. An alumna of the Enterprise Development Centre at Pan African University, where she studied Social Sector Management, Tosin also holds a Master’s in International Human Resources Management from the University of East London. She is a certified Financial Education Instructor and a trusted authority in her field.",
      "As the Lead Consultant of TPF Consulting Services, Tosin empowers individuals and SMEs through financial education and systems optimization, focusing on personal and business finance. With over 13 years of experience—including six years in senior management roles like Head of Operations and Finance—she is passionate about helping families achieve financial security and fulfillment by mastering how to live well on their income.",
      "Known for her sharp analytical mind and attention to detail, Tosin excels at delivering tangible results for her clients. As a certified personal finance coach and a master practitioner of Neuro-Linguistic Programming (NLP), she is adept at helping people break free from limiting financial habits and build sustainable wealth. She runs the popular online program “Money Makeover” and the offline workshop series “The Money Clinic,” where she mentors professionals, couples, and individuals looking to gain control over their finances.",
      "Tosin has been a featured guest on numerous radio and TV programs, including Be All You Can Be with Lanre Olusola on 99.9 FM, Heart Matters on 105.1 FM, Galaxy TV, and Moms Chat on TV, where she shares her insights on personal and family finance. She’s also facilitated financial workshops for prominent organizations like Ruff ‘n’ Tumble and various religious institutions.",
      "A committed educator, Tosin has led numerous live and virtual classes, such as the Family System Engineering Course and Wealth Growth Masterclass. She’s a sought-after speaker at conferences and women’s events, offering practical strategies for financial growth and empowerment.",
      "Outside of work, Tosin enjoys reading, solving puzzles, researching, and engaging in intellectual conversations. She is happily married and the proud mother of two children.",
      "With a deep passion for helping families and individuals unlock their financial potential, Tosin Praise-Fowowe is dedicated to making financial freedom accessible for all.",
    ],
  },
  {
    slug: "theophilus-adewale-onadeko",
    name: "Theophilus Adewale Onadeko, PhD, FCIB",
    role: "CEO, SWAgCo Limited & Fractional MD, Vantage Forum",
    image: "/theophilus-onadeko.jpg",
    shortBio:
      "Dr. Theo Adewale Onadeko is a seasoned finance, agribusiness and development executive with over 25 years of experience across corporate strategy, impact investing, SME banking, and agribusiness value chain finance. He is currently the CEO of SWAgCo Limited and Fractional Managing Director of Vantage Forum Ltd/Gte.",
    fullBio: [
      "Dr. Theo Adewale Onadeko is a seasoned finance, agribusiness and development executive with over 25 years of experience across corporate strategy, impact investing, SME banking, agribusiness value chain finance, financial technology and management consulting. He is currently the CEO of SWAgCo Limited, the agribusiness vehicle of Odu’a Investment Company Limited, where he leads initiatives advancing sustainable agriculture, food security and value creation across South-West Nigeria. He serves as Fractional Managing Director of Vantage Forum Ltd/Gte, the dynamic global economic development impact vehicle of The Elevation Church, dedicated to raising kingdom-minded leaders for the marketplace, supporting SMEs through access to capacity building, finance and a vibrant community of venture builders.",
      "As founding Director at Deewal Group, he provides strategic leadership over family-owned impact-oriented investment & advisory vehicles with interests in financial services, real estate, energy, agribusiness and general commerce. He started his banking career at Standard Trust Bank Ltd (later UBA Plc) and had stints at Halifax Bank of Scotland and AXA PPP, both in the United Kingdom. He subsequently held senior roles at International Finance Corporation (World Bank Group), NIRSAL Plc, ARM Group and consulted for Financial Sector Deepening Africa (FSDA), German Development Cooperation (GIZ), Access Bank Plc, and Mandilas Group.",
      "He holds a PhD in Agricultural Economics & Sustainable Environment from the World Bank Centre of Excellence, Federal University of Agriculture Abeokuta (FUNAAB), MSc in Development Economics & Policy from the University of Manchester; and MBA in Finance from Alliance Manchester Business School, UK. He is a graduate of Agricultural Economics & Farm Management from FUNAAB and a Fellow of the Chartered Institute of Bankers of Nigeria.",
      "Dr. Onadeko is deeply passionate about Africapitalism - the economic philosophy that the African private sector has the power to transform Africa through long-term investments, creating both economic prosperity and social wealth in a sustainable manner.",
    ],
  },
  {
    slug: "lanre-olokunde",
    name: "Lanre Olokunde",
    role: "Managing Partner, Voranex Africa & Resident Pastor, TEC FESTAC",
    image: "/lanre-olokunde.jpg",
    shortBio:
      "Lanre Olokunde is a visionary leader and technology strategist who operates at the unique intersection of innovation and faith. A distinguished expert in enterprise AI solutions and Managing Partner at Voranex Africa, he is focused on building the most trusted African operating layer for global businesses.",
    fullBio: [
      "Lanre Olokunde is a visionary leader and technology strategist who operates at the unique intersection of innovation and faith. Currently serving as the Resident Pastor of The Elevation Church, FESTAC, he is deeply committed to raising leaders who function effectively across both ministry and industry, empowering them to carry a Kingdom mandate into the global marketplace.",
      "In the corporate sector, Lanre is a distinguished expert in enterprise AI solutions, currently serving as the Managing Partner at Voranex Africa where he is focused on building the most trusted African operating layer for global businesses and previously holding senior roles at Dyna AI, Gupshup and Chpter.",
      "As the institutional lead for AI initiatives at The Elevation Church, Lanre bridges the gap between cutting-edge technology and spiritual leadership to drive sustainable Kingdom impact.",
      "He is happily married to his beautiful wife; Uchechukwu, and they both reside in Lagos Nigeria, where they serve and do ministry together under the leadership of Pastor Godman Akinlabi.",
    ],
  },
  {
    slug: "joseph-ogebe",
    name: "Dr. Joseph Ogebe",
    role: "Head of Research & Development, Nigerian Economic Summit Group (NESG)",
    image: "/joseph-ogebe.jpg",
    shortBio:
      "Dr. Joseph Ogebe is a seasoned development economist and macroeconomic policy expert with over a decade of experience spanning international development, economic research, and private-sector policy analysis. He currently leads high-impact economic reform and development research at the NESG.",
    fullBio: [
      "Dr. Joseph Ogebe is a seasoned development economist and macroeconomic policy expert with over a decade of experience spanning international development, economic research, and private-sector policy analysis. He currently serves as Head of Research and Development at the Nigerian Economic Summit Group (NESG), where he leads high-impact research initiatives focused on economic reform, macroeconomic policy, institutional design, and sustainable development in Nigeria.",
      "At the NESG, Dr. Ogebe oversees strategic research programmes that provide evidence-based policy recommendations to government, private-sector leaders, and development partners. His work strengthens national conversations on economic growth, structural reform, fiscal sustainability, and inclusive development, positioning the NESG as a leading private-sector think tank in Nigeria.",
      "Prior to joining NESG, Joseph served as a Research Economist at the World Bank, where he supported macroeconomic and structural reform programmes at both federal and subnational levels. His contributions informed the design and implementation of data-driven policies aimed at enhancing economic resilience, public sector performance, and long-term development outcomes in Nigeria.",
      "Dr. Ogebe holds a Ph.D. in Economics from the University of Ibadan, with expertise in development economics, macroeconomic analysis, and policy evaluation. He has served as an external reviewer for reputable academic journals and has published in leading international journals across development economics, macroeconomics, and public policy analysis.",
      "With deep expertise in economic research, policy reform, and development strategy, Dr. Joseph Ogebe continues to contribute to advancing evidence-based economic policymaking and sustainable growth in Nigeria and Africa.",
    ],
  },
  {
    slug: "jimmy-mokikan",
    name: "Jimmy (G-Me) Mokikan",
    role: "Director of Human Resources, VerifyMe Nigeria",
    image: "/jimmy-mokikan.jpg",
    shortBio:
      "Jimmy (G-Me) Mokikan is a seasoned Human Resources Executive and leadership mentor with over two decades of experience across banking, fintech, telecommunications, and digital identity services. As Director of HR at VerifyMe Nigeria, he aligns people strategy with business performance in high-growth environments.",
    fullBio: [
      "Jimmy (G-Me) Mokikan is a seasoned Human Resources Executive and leadership mentor with over 2 decades of experience across banking, fintech, telecommunications, and digital identity and trust services. He is currently Director of Human Resources at VerifyMe Nigeria, a leading provider of identity verification, background screening, and digital trust solutions that help businesses and institutions make safer, faster decisions about the people and organizations they engage with.",
      "Jimmy is known for aligning people strategy with business performance in regulated and high growth environments. His expertise spans HR strategy and transformation, organizational design, performance management, reward, talent development, employee relations, and regulatory compliance. He sits on the HR Experts Committee of the Nigeria Employers’ Consultative Association (NECA) and has served as a credentialed delegate to the International Labour Conference in Geneva.",
      "Beyond the boardroom, Jimmy is passionate about helping professionals find clarity and direction. He leads career and professional development initiatives in his church community and mentors individuals at every career stage, with a practical, structured approach grounded in real life application. He believes leadership is stewardship, built on integrity, accountability, and influence by example.",
      "He holds an MBA in Human Resources and is a member of the Chartered Institute of Personnel Management of Nigeria (CIPM). He is also an author and speaker on leadership, purpose, and transformation.",
    ],
  },
  {
    slug: "adebola-esther-santos",
    name: "Mrs Adebola Esther Santos",
    role: "Founder & CEO, RecycleGarb Hub Limited | Entrepreneur & Circular Economy Advocate",
    image: "/adebola-santos.jpg",
    shortBio:
      "Mrs Adebola Santos is a Nigerian entrepreneur with experience spanning banking, environmental sustainability, circular economy, food processing, and international agro-commodity trade. As Founder & CEO of RecycleGarb Hub Limited, she has facilitated the recovery and recycling of over 5,000 tons of plastic waste.",
    fullBio: [
      "Mrs Adebola Santos is a Nigerian entrepreneur with experience spanning banking, environmental sustainability, circular economy, food processing, and international agro-commodity trade.",
      "She began her professional career in the banking sector in 2012, gaining over six years of experience in banking and customer relationship management, while serving in various supervisory roles before resigning in 2018 to focus on entrepreneurship and environmental sustainability.",
      "She is the Founder and CEO of RecycleGarb Hub Limited, an environmental and circular economy enterprise established in 2018. Under her leadership, RecycleGarb has facilitated the recovery and recycling of over 5,000 tons of plastic waste, including the aggregation, processing, and export of recyclable plastic waste. The company also promotes community-based waste recovery, recycling education, and sustainable livelihood opportunities.",
      "Adebola is the driving force behind initiatives such as Waste4Sch, EcoCredit, and Waste4Food, which leverage recyclable waste to support education, financial inclusion, and food security for underserved communities. She is also the convener of Ibadan Goes Green and a facilitator under the GST Entrepreneurship Programme at Lead City University, where she trains students in entrepreneurship and sustainability. She has trained and mentored over 1,000 aspiring entrepreneurs and recycling practitioners.",
      "Beyond environmental enterprise, she is the Cofounder of ZESTAR, a food and spice brand focused on natural food products, fruit-based beverages, and accessible food processing solutions.",
      "She is also the Co-founder of Truescope Global, an agro-commodity company engaged in the sourcing and international trade of agricultural commodities and natural products, connecting markets across the world.",
      "Through her diverse entrepreneurial ventures, Adebola continues to champion innovation, business development, environmental responsibility, economic empowerment, and sustainable value creation across different sectors.",
    ],
  },
  {
    slug: "akinola-ayobami",
    name: "Akinola Ayobami",
    role: "Founder, BeaconHub & ElevateHub | Software Engineer & Entrepreneur",
    image: "/ayobami.jpeg",
    shortBio:
      "Akinola Ayobami is a software engineer and entrepreneur, and the founder of BeaconHub, a software development agency building web and mobile products for businesses and organizations. With over five years of experience, he has delivered fintech platforms, booking systems, and data compliance tools while growing the tech ecosystem in Oyo State.",
    fullBio: [
      "Akinola Ayobami is a software engineer and entrepreneur, and the founder of BeaconHub, a software development agency that builds web and mobile products for businesses and organizations. With over five years of experience, he has delivered fintech platforms, online booking and payment systems, event-planning apps, and tools that keep working in low-connectivity environments. He is currently building Kompli, a platform to help Nigerian businesses comply with the Nigeria Data Protection Act. A founder in more than one industry, and he helps grow the tech community in Oyo State through ElevateHub.",
    ],
  },
];

export default function SpeakersSection() {
  return (
    <section id="speakers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block text-secondary text-sm font-bold uppercase tracking-widest mb-4">
              Featured Speakers
            </span>
            <h2 className="text-4xl sm:text-5xl text-slate-900 leading-tight">
              Meet Our <span className="text-primary">Speakers</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg">
              Learn directly from accomplished industry leaders, finance experts, and enterprise builders at the Ibadan Business Roundtable.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all self-start md:self-auto shadow-md shadow-primary/20"
          >
            Reserve Your Seat <ArrowRight size={16} />
          </Link>
        </div>

        {/* Speakers Grid — Uniform Card Heights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakersList.map((speaker) => (
            <div
              key={speaker.slug}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Portrait Image at top */}
              <Link
                href={`/speakers/${speaker.slug}`}
                className="relative w-full aspect-[4/4.2] overflow-hidden bg-slate-200 block"
              >
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
              </Link>

              {/* Content Block — Fixed Uniform Proportions */}
              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <Link href={`/speakers/${speaker.slug}`}>
                    <h3 className="text-2xl text-slate-900 tracking-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                      {speaker.name}
                    </h3>
                  </Link>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3 min-h-[2rem] line-clamp-2">
                    {speaker.role}
                  </p>
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed line-clamp-5 min-h-[7.5rem]">
                    {speaker.shortBio}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/70">
                  <Link
                    href={`/speakers/${speaker.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:text-secondary-dark transition-colors group/link"
                  >
                    Read More
                    <ArrowRight
                      size={15}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
