import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import {Link} from "@inertiajs/react";

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full justify-between items-center gap-2">
                {/*<SidebarTrigger className="-ml-1" />*/}
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <Link className="self-end" href={`/`}>
                    <i className="fa-solid fa-house text-xl"></i>
                </Link>
            </div>
        </header>
    );
}
