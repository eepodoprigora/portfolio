import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import TextPageView, { TextPageViewRawProps } from "@/pages-view/TextPageView";
import { getCommonPageProps } from "@/application/get-common-page-props";
import { CommonPageProps } from "@/shared/model/types";
import { AppLocale } from "@/shared/сonfig/const";

const PrivacyPolicyPage = ({
  textBlocks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <TextPageView textBlocks={textBlocks} />;
};

export default PrivacyPolicyPage;

export type TextPageProps = CommonPageProps & TextPageViewRawProps;

export const getServerSideProps: GetServerSideProps<TextPageProps> = async ({
  locale,
}) => {
  const commonPageProps = await getCommonPageProps(locale as AppLocale);

  const isEn = locale === "en";
  return {
    props: {
      ...commonPageProps,
      bodyClass: "text-page",

      meta: {
        ...commonPageProps.meta,
        title: isEn
          ? "Personal Data Processing Policy"
          : "Политика в отношении обработки персональных данных",
      },
      breadcrumbs: [],
      textBlocks: isEn
        ? `<h1>Privacy Policy</h1>

<p><strong>Last updated:</strong> May 2026 &nbsp;·&nbsp; GDPR compliant</p>

<hr>

<h3>1. General Information</h3>

<p>This Privacy Policy applies to this portfolio website (the “Website”), operated by a private individual, who can be contacted at: <a href="mailto:eepodoprigora@gmail.com">eepodoprigora@gmail.com</a> (the “Owner”).</p>

<p>By using the Website, you agree to the terms described below.</p>

<hr>

<h3>2. What Data Is Collected</h3>

<p>The Website does not directly collect personal data. The only service used is Vercel Analytics, which collects only aggregated, anonymized technical information:</p>

<ul>
<li>Pages you visit</li>
<li>Referral source</li>
<li>Device and browser type (without fingerprinting)</li>
<li>Country (without precise IP address)</li>
<li>Time of visit</li>
</ul>

<p>This data cannot be used to personally identify you and is not linked across sessions.</p>

<hr>

<h3>3. Vercel Analytics</h3>

<p>The Website uses a service provided by Vercel Inc. (USA). It operates without cookies, cross-session tracking, or IP address collection. Vercel is SOC 2 certified and GDPR compliant.</p>

<p><a href="https://vercel.com/legal/privacy-policy">Vercel Privacy Policy →</a></p>

<hr>

<h3>4. Legal Basis (for EU Users)</h3>

<p>Data processing through Vercel Analytics is based on <strong>legitimate interest</strong> (Article 6(1)(f) GDPR). Since Vercel Analytics does not use cookies or identify users, prior consent is not required.</p>

<hr>

<h3>5. Cookies</h3>

<p>The Website <strong>does not use cookies.</strong> Vercel Analytics works without them, and no files are stored in your browser.</p>

<hr>

<h3>6. Purpose of Data Processing</h3>

<ul>
<li>Analyzing website traffic and popular sections</li>
<li>Improving the Website’s structure and content</li>
<li>Evaluating the effectiveness of the portfolio</li>
</ul>

<p>The data is not shared with third parties for commercial purposes and is not used for advertising.</p>

<hr>

<h3>7. Your Rights</h3>

<ul>
<li><strong>EU / EEA (GDPR):</strong> right of access, rectification, erasure, restriction of processing, data portability, and objection</li>
<li><strong>United Kingdom (UK GDPR):</strong> similar rights apply</li>
<li><strong>Other countries:</strong> rights according to local laws</li>
</ul>

<p>Since Vercel Analytics does not collect identifiable personal data, most of these rights are technically not applicable. However, you may always contact me or contact <a href="https://vercel.com/legal/privacy-policy">Vercel</a> directly.</p>

<hr>

<h3>8. International Data Transfers</h3>

<p>Vercel Inc. is based in the United States. Data transfers are carried out in accordance with the EU Standard Contractual Clauses (SCCs).</p>

<hr>

<h3>9. Third-Party Links</h3>

<p>The Website may contain links to external resources. The Owner is not responsible for the privacy practices of those websites.</p>

<hr>

<h3>10. Changes to This Policy</h3>

<p>The current version of this Privacy Policy will always be available on this page along with the date of the latest update.</p>

<hr>

<h3>11. Contact</h3>

<p>For questions regarding data processing: <a href="mailto:eepodoprigora@gmail.com">eepodoprigora@gmail.com</a></p>`
        : `
<h1>Политика конфиденциальности</h1>
<p><strong>Последнее обновление:</strong> май 2026 &nbsp;·&nbsp; GDPR-совместима</p>
<hr>
<h3>1. Общие положения</h3>
<p>Настоящая Политика конфиденциальности действует в отношении сайта-портфолио (далее — «Сайт»), которым управляет физическое лицо, доступное для связи по адресу: <a href="mailto:eepodoprigora@gmail.com">eepodoprigora@gmail.com</a> (далее — «Владелец»).</p>
<p>Используя Сайт, вы соглашаетесь с условиями, описанными ниже.</p>
<hr>
<h3>2. Какие данные собираются</h3>
<p>Сайт не собирает персональные данные напрямую. Единственный используемый сервис — Vercel Analytics — собирает исключительно агрегированные, обезличенные технические данные:</p>
<ul>
<li>Страницы, которые вы посещаете</li>
<li>Источник перехода</li>
<li>Тип устройства и браузер (без fingerprinting)</li>
<li>Страна (без точного IP)</li>
<li>Время посещения</li>
</ul>
<p>Данные не позволяют идентифицировать вас лично и не связываются между сессиями.</p>
<hr>
<h3>3. Vercel Analytics</h3>
<p>Сервис от Vercel Inc. (США). Работает без cookie, без межсессионного отслеживания, без сбора IP-адресов. Vercel сертифицирован по стандарту SOC 2 и соответствует требованиям GDPR.</p>
<p><a href="https://vercel.com/legal/privacy-policy">Политика конфиденциальности Vercel →</a></p>
<hr>
<h3>4. Правовое основание (для пользователей из ЕС)</h3>
<p>Обработка данных через Vercel Analytics осуществляется на основании <strong>законного интереса</strong> (Legitimate Interest, ст. 6(1)(f) GDPR). Поскольку Vercel Analytics не использует cookie и не идентифицирует пользователей, предварительное согласие (consent) не требуется.</p>
<hr>
<h3>5. Cookie-файлы</h3>
<p>Сайт <strong>не использует cookie.</strong> Vercel Analytics работает без них — никакие файлы не сохраняются в вашем браузере.</p>
<hr>
<h3>6. Цели обработки данных</h3>
<ul>
<li>Анализ посещаемости и популярных разделов</li>
<li>Улучшение структуры и содержания Сайта</li>
<li>Оценка эффективности портфолио</li>
</ul>
<p>Данные не передаются третьим лицам в коммерческих целях и не используются для рекламы.</p>
<hr>
<h3>7. Ваши права</h3>
<ul>
<li><strong>ЕС / EEA (GDPR):</strong> доступ, исправление, удаление, ограничение обработки, переносимость, возражение</li>
<li><strong>Великобритания (UK GDPR):</strong> аналогичные права</li>
<li><strong>Другие страны:</strong> права согласно местному законодательству</li>
</ul>
<p>Поскольку Vercel Analytics не собирает идентифицируемые данные, большинство прав технически неприменимы — но вы всегда можете обратиться ко мне или напрямую в <a href="https://vercel.com/legal/privacy-policy">Vercel</a>.</p>
<hr>
<h3>8. Передача данных за рубеж</h3>
<p>Vercel Inc. базируется в США. Передача данных осуществляется в соответствии со стандартными договорными положениями ЕС (Standard Contractual Clauses, SCC).</p>
<hr>
<h3>9. Ссылки на сторонние сайты</h3>
<p>Сайт может содержать ссылки на внешние ресурсы. Владелец не несёт ответственности за политику конфиденциальности этих сайтов.</p>
<hr>
<h3>10. Изменения в политике</h3>
<p>Актуальная версия всегда доступна на этой странице с указанием даты обновления.</p>
<hr>
<h3>11. Контакты</h3>
<p>По вопросам обработки данных: <a href="mailto:eepodoprigora@gmail.com">eepodoprigora@gmail.com</a></p>
      `,
    } satisfies TextPageProps,
  };
};
