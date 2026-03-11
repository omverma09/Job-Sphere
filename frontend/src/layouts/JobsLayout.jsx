import { useState, useCallback, useRef, useMemo } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import API from "../api/axios.js";
import JobFilters from "../components/dashboardcompo/JobFilters.jsx";
import JobList from "../components/dashboardcompo/JobList.jsx";

const JOBS_PER_PAGE = 10;

const JobLayout = () => {
  const [filters, setFilters] = useState({});
  const observerRef = useRef();
  const lastJobRef = useRef();

  // Clean filters for API
  const cleanFilters = useCallback((filters) => {
    const cleaned = { ...filters };

    // Convert arrays to comma-separated strings
    if (cleaned.workMode && Array.isArray(cleaned.workMode)) {
      cleaned.workMode = cleaned.workMode.join(',');
    }
    if (cleaned.jobType && Array.isArray(cleaned.jobType)) {
      cleaned.jobType = cleaned.jobType.join(',');
    }

    // Remove empty filters
    Object.keys(cleaned).forEach(key => {
      if (cleaned[key] === '' || cleaned[key] === null || cleaned[key] === undefined) {
        delete cleaned[key];
      }
    });

    return cleaned;
  }, []);

  // Fetch jobs function for React Query
  const fetchJobs = async ({ pageParam = null }) => {
    const params = {
      limit: JOBS_PER_PAGE,
      cursor: pageParam,
      ...cleanFilters(filters)
    };

    const res = await API.get('/jobs', { params });
    return res.data;
  };

  // React Query infinite hook
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['jobs', filters], // Filters change par naye query
    queryFn: fetchJobs,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.pagination?.nextCursor,
    staleTime: 5 * 60 * 1000, // 5 minutes tak data fresh maano
    cacheTime: 10 * 60 * 1000, // 10 minutes cache mein rakho
    refetchOnWindowFocus: false, // Performance ke liye
  });

  // Flatten all jobs from all pages
  const allJobs = useMemo(() => {
    return data?.pages.flatMap(page => page.jobs) ?? [];
  }, [data]);

  // Intersection Observer for infinite scroll
  const lastJobElementRef = useCallback((node) => {
    if (isLoading || isFetchingNextPage) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, {
      rootMargin: '200px', // 200px pehle se hi next batch load karo
      threshold: 0.1
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Handle filter apply
  const handleApplyFilters = useCallback((appliedFilters) => {
    setFilters(appliedFilters);
    // Scroll to top when filters change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading jobs: {error?.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <JobFilters
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            activeFilters={filters}
          />
        </div>

        {/* Jobs Area */}
        <div className="md:col-span-3">
          {/* Results count and active filters */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-gray-600">
                Showing {allJobs.length} jobs
                {Object.keys(filters).length > 0 && ' (filtered)'}
              </span>
            </div>
            {Object.keys(filters).length > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Job List with loading states */}
          <JobList
            jobs={allJobs}
            loading={isLoading}
            lastJobRef={lastJobElementRef}
          />

          {/* Loading more indicator */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* End of results message */}
          {!hasNextPage && !isLoading && allJobs.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>You've reached the end! 🎉</p>
              <p className="text-sm">No more jobs to show</p>
            </div>
          )}

          {/* No results state */}
          {!isLoading && allJobs.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or clear them to see more jobs.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobLayout;