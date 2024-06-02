'use client'
import Dropdown from '@/components/ui/Dropdown'
import { Badge } from '@/components/ui/badge'
import { redirect, usePathname, useRouter } from '@/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { useLocale, useTranslations } from 'next-intl'


export default function LanguageSelector(): React.ReactElement {
  const t = useTranslations()
  const locale = useLocale()
  
  const pathname = usePathname();
  console.log("pathname: ", pathname);
  
  const router = useRouter()
  const handleLanguageChange = (code: string) => {
    router.replace(pathname, {locale: code});
  }

  return (
    <Dropdown
      render={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center transition-all hover:text-emerald-500">
                <div className="h-[100%] w-[100%]">
                  <img
                    src={locale === 'en' ? '/english.png' : '/vietnam.png'}
                    alt=""
                    className="w-[60%]"
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-max">
              {/* <p>{t('header.jobSeeker.notifications')}</p> */}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      }
      position="bottomRight"
    >
      <Dropdown.Item onItemClick={() => handleLanguageChange('vi')}>
        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-2">
            <img src={'/vietnam.png'} alt="" className="h-5 w-7" />
            <span className="w-[1px] h-6 bg-slate-200"></span>
          </div>
          <span> {t('header.language.code.vi')}</span>
        </div>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onItemClick={() => handleLanguageChange('en')}>
        <div className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-2">
            <img src={'/english.png'} alt="" className="h-5 w-7" />
            <span className="w-[1px] h-6 bg-slate-200"></span>
          </div>
          <span> {t('header.language.code.en')}</span>
        </div>
      </Dropdown.Item>
    </Dropdown>
  )
}
